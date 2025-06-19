<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-6">
        <!-- Header -->
        <v-row class="mb-6">
          <v-col>
            <div class="d-flex align-center mb-4">
              <v-icon size="32" color="primary" class="mr-3">mdi-calendar-month</v-icon>
              <h1 class="text-h4 font-weight-bold text-primary">予約カレンダー</h1>
            </div>
            <p class="text-subtitle-1 text-grey-darken-1">
              客室別の予約状況を一目で確認できます
            </p>
          </v-col>
        </v-row>

        <!-- Calendar Navigation -->
        <v-row class="mb-4">
          <v-col>
            <v-card class="pa-4" elevation="2">
              <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                  <v-btn
                    icon="mdi-chevron-left"
                    variant="text"
                    @click="previousMonth"
                    class="mr-2"
                  ></v-btn>
                  <h2 class="text-h5 font-weight-medium">
                    {{ currentMonthYear }}
                  </h2>
                  <v-btn
                    icon="mdi-chevron-right"
                    variant="text"
                    @click="nextMonth"
                    class="ml-2"
                  ></v-btn>
                </div>
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="goToToday"
                  prepend-icon="mdi-today"
                >
                  今日
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Reservation Calendar -->
        <v-row>
          <v-col>
            <v-card elevation="3">
              <v-card-title class="bg-primary text-white pa-4">
                <v-icon class="mr-2">mdi-bed</v-icon>
                客室予約状況
              </v-card-title>
              
              <div class="calendar-container">
                <!-- Calendar Header -->
                <div class="calendar-header">
                  <div class="room-column-header">客室</div>
                  <div 
                    v-for="date in calendarDates" 
                    :key="date.dateString"
                    class="date-column-header"
                    :class="{ 'today': date.isToday, 'weekend': date.isWeekend }"
                  >
                    <div class="date-day">{{ date.day }}</div>
                    <div class="date-weekday">{{ date.weekday }}</div>
                  </div>
                </div>

                <!-- Calendar Body -->
                <div class="calendar-body">
                  <div 
                    v-for="room in rooms" 
                    :key="room.id"
                    class="room-row"
                  >
                    <!-- Room Info -->
                    <div class="room-info">
                      <div class="room-number">{{ room.number }}</div>
                      <div class="room-type">{{ room.type }}</div>
                      <div class="room-capacity">
                        <v-icon size="small" class="mr-1">mdi-account</v-icon>
                        {{ room.capacity }}名
                      </div>
                    </div>

                    <!-- Date Cells -->
                    <div class="date-cells">
                      <div 
                        v-for="date in calendarDates" 
                        :key="`${room.id}-${date.dateString}`"
                        class="date-cell"
                        :class="{ 'today': date.isToday, 'weekend': date.isWeekend }"
                      >
                        <!-- Reservation Bands -->
                        <div 
                          v-for="reservation in getReservationsForRoomAndDate(room.id, date.dateString)"
                          :key="reservation.id"
                          class="reservation-band"
                          :class="reservation.status"
                          :style="getReservationStyle(reservation, date.dateString)"
                          @click="showReservationDetails(reservation)"
                        >
                          <div class="reservation-content">
                            <div class="guest-name">{{ reservation.guestName }}</div>
                            <div class="reservation-info">
                              {{ reservation.checkIn }} - {{ reservation.checkOut }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Legend -->
        <v-row class="mt-4">
          <v-col>
            <v-card class="pa-4" elevation="1">
              <v-card-title class="text-h6 pb-2">ステータス凡例</v-card-title>
              <div class="d-flex flex-wrap gap-4">
                <div class="d-flex align-center">
                  <div class="legend-color confirmed mr-2"></div>
                  <span>確定予約</span>
                </div>
                <div class="d-flex align-center">
                  <div class="legend-color tentative mr-2"></div>
                  <span>仮予約</span>
                </div>
                <div class="d-flex align-center">
                  <div class="legend-color checked-in mr-2"></div>
                  <span>チェックイン済み</span>
                </div>
                <div class="d-flex align-center">
                  <div class="legend-color checked-out mr-2"></div>
                  <span>チェックアウト済み</span>
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>

        <!-- Reservation Details Dialog -->
        <v-dialog v-model="reservationDialog" max-width="500">
          <v-card v-if="selectedReservation">
            <v-card-title class="bg-primary text-white">
              <v-icon class="mr-2">mdi-information</v-icon>
              予約詳細
            </v-card-title>
            <v-card-text class="pa-6">
              <v-list>
                <v-list-item>
                  <v-list-item-title>お客様名</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedReservation.guestName }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>客室</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedReservation.roomNumber }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>宿泊期間</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ selectedReservation.checkIn }} - {{ selectedReservation.checkOut }}
                  </v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>宿泊日数</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedReservation.nights }}泊</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>人数</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedReservation.guests }}名</v-list-item-subtitle>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>ステータス</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-chip 
                      :color="getStatusColor(selectedReservation.status)"
                      size="small"
                    >
                      {{ getStatusText(selectedReservation.status) }}
                    </v-chip>
                  </v-list-item-subtitle>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions class="pa-4">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="reservationDialog = false">
                閉じる
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// Page meta
definePageMeta({
  title: 'ホテル予約管理システム - 予約カレンダー'
})

// Types
interface Room {
  id: number
  number: string
  type: string
  capacity: number
}

interface Reservation {
  id: number
  roomId: number
  roomNumber: string
  guestName: string
  checkIn: string
  checkOut: string
  nights: number
  guests: number
  status: 'confirmed' | 'tentative' | 'checked-in' | 'checked-out'
}

interface CalendarDate {
  date: Date
  dateString: string
  day: number
  weekday: string
  isToday: boolean
  isWeekend: boolean
}

// Reactive data
const currentDate = ref(new Date())
const reservationDialog = ref(false)
const selectedReservation = ref<Reservation | null>(null)

// Sample data
const rooms = ref<Room[]>([
  { id: 1, number: '101', type: 'スタンダード', capacity: 2 },
  { id: 2, number: '102', type: 'スタンダード', capacity: 2 },
  { id: 3, number: '201', type: 'デラックス', capacity: 3 },
  { id: 4, number: '202', type: 'デラックス', capacity: 3 },
  { id: 5, number: '301', type: 'スイート', capacity: 4 },
  { id: 6, number: '302', type: 'スイート', capacity: 4 },
])

const reservations = ref<Reservation[]>([
  {
    id: 1,
    roomId: 1,
    roomNumber: '101',
    guestName: '田中太郎',
    checkIn: '2024-06-20',
    checkOut: '2024-06-23',
    nights: 3,
    guests: 2,
    status: 'confirmed'
  },
  {
    id: 2,
    roomId: 2,
    roomNumber: '102',
    guestName: '佐藤花子',
    checkIn: '2024-06-19',
    checkOut: '2024-06-21',
    nights: 2,
    guests: 1,
    status: 'checked-in'
  },
  {
    id: 3,
    roomId: 3,
    roomNumber: '201',
    guestName: '山田一郎',
    checkIn: '2024-06-22',
    checkOut: '2024-06-25',
    nights: 3,
    guests: 3,
    status: 'tentative'
  },
  {
    id: 4,
    roomId: 4,
    roomNumber: '202',
    guestName: '鈴木美咲',
    checkIn: '2024-06-18',
    checkOut: '2024-06-20',
    nights: 2,
    guests: 2,
    status: 'checked-out'
  },
  {
    id: 5,
    roomId: 5,
    roomNumber: '301',
    guestName: '高橋健太',
    checkIn: '2024-06-25',
    checkOut: '2024-06-28',
    nights: 3,
    guests: 4,
    status: 'confirmed'
  },
])

// Computed properties
const currentMonthYear = computed(() => {
  return `${currentDate.value.getFullYear()}年${currentDate.value.getMonth() + 1}月`
})

const calendarDates = computed((): CalendarDate[] => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const today = new Date()
  const dates: CalendarDate[] = []
  
  // Get days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const dateString = date.toISOString().split('T')[0]
    const weekdayNames = ['日', '月', '火', '水', '木', '金', '土']
    const weekday = weekdayNames[date.getDay()]
    const isToday = dateString === today.toISOString().split('T')[0]
    const isWeekend = date.getDay() === 0 || date.getDay() === 6
    
    dates.push({
      date,
      dateString,
      day,
      weekday,
      isToday,
      isWeekend
    })
  }
  
  return dates
})

// Methods
const previousMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
}

const goToToday = () => {
  currentDate.value = new Date()
}

const getReservationsForRoomAndDate = (roomId: number, dateString: string): Reservation[] => {
  const targetDate = new Date(dateString)
  
  return reservations.value.filter(reservation => {
    if (reservation.roomId !== roomId) return false
    
    const checkIn = new Date(reservation.checkIn)
    const checkOut = new Date(reservation.checkOut)
    
    return targetDate >= checkIn && targetDate < checkOut
  })
}

const getReservationStyle = (reservation: Reservation, dateString: string) => {
  const checkIn = new Date(reservation.checkIn)
  const targetDate = new Date(dateString)
  
  // If this is the first day of the reservation, show the full band
  if (checkIn.toISOString().split('T')[0] === dateString) {
    return {
      zIndex: 10
    }
  }
  
  // For continuing days, hide the content to avoid repetition
  return {
    zIndex: 1
  }
}

const showReservationDetails = (reservation: Reservation) => {
  selectedReservation.value = reservation
  reservationDialog.value = true
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case 'confirmed': return 'success'
    case 'tentative': return 'warning'
    case 'checked-in': return 'info'
    case 'checked-out': return 'grey'
    default: return 'primary'
  }
}

const getStatusText = (status: string): string => {
  switch (status) {
    case 'confirmed': return '確定予約'
    case 'tentative': return '仮予約'
    case 'checked-in': return 'チェックイン済み'
    case 'checked-out': return 'チェックアウト済み'
    default: return status
  }
}

// Head configuration
useHead({
  title: 'ホテル予約管理システム - 予約カレンダー',
  meta: [
    { name: 'description', content: 'ホテルの予約状況をカレンダー形式で確認できるページです。客室別に宿泊予定を一目で把握できます。' }
  ]
})
</script>

<style scoped>
.calendar-container {
  overflow-x: auto;
  min-height: 600px;
}

.calendar-header {
  display: flex;
  background-color: #f5f5f5;
  border-bottom: 2px solid #e0e0e0;
}

.room-column-header {
  min-width: 180px;
  max-width: 180px;
  padding: 16px;
  font-weight: 600;
  text-align: center;
  border-right: 1px solid #e0e0e0;
  background-color: #1976d2;
  color: white;
}

.date-column-header {
  min-width: 80px;
  max-width: 80px;
  padding: 8px 4px;
  text-align: center;
  border-right: 1px solid #e0e0e0;
  background-color: #f8f9fa;
}

.date-column-header.today {
  background-color: #e3f2fd;
  color: #1976d2;
  font-weight: 600;
}

.date-column-header.weekend {
  background-color: #ffebee;
}

.date-day {
  font-size: 14px;
  font-weight: 500;
}

.date-weekday {
  font-size: 12px;
  color: #666;
}

.calendar-body {
  background-color: white;
}

.room-row {
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  min-height: 80px;
}

.room-row:hover {
  background-color: #fafafa;
}

.room-info {
  min-width: 180px;
  max-width: 180px;
  padding: 16px;
  border-right: 1px solid #e0e0e0;
  background-color: #fff;
}

.room-number {
  font-size: 18px;
  font-weight: 600;
  color: #1976d2;
  margin-bottom: 4px;
}

.room-type {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.room-capacity {
  font-size: 12px;
  color: #999;
  display: flex;
  align-items: center;
}

.date-cells {
  display: flex;
  flex: 1;
}

.date-cell {
  min-width: 80px;
  max-width: 80px;
  min-height: 80px;
  border-right: 1px solid #e0e0e0;
  position: relative;
  padding: 4px;
}

.date-cell.today {
  background-color: #e3f2fd;
}

.date-cell.weekend {
  background-color: #ffebee;
}

.reservation-band {
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  height: 72px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
}

.reservation-band:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.reservation-band.confirmed {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
  color: white;
}

.reservation-band.tentative {
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
  color: white;
}

.reservation-band.checked-in {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
  color: white;
}

.reservation-band.checked-out {
  background: linear-gradient(135deg, #9e9e9e 0%, #757575 100%);
  color: white;
}

.reservation-content {
  padding: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.guest-name {
  font-size: 12px;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 2px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.reservation-info {
  font-size: 10px;
  opacity: 0.9;
  line-height: 1.2;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}

.legend-color.confirmed {
  background: linear-gradient(135deg, #4caf50 0%, #45a049 100%);
}

.legend-color.tentative {
  background: linear-gradient(135deg, #ff9800 0%, #f57c00 100%);
}

.legend-color.checked-in {
  background: linear-gradient(135deg, #2196f3 0%, #1976d2 100%);
}

.legend-color.checked-out {
  background: linear-gradient(135deg, #9e9e9e 0%, #757575 100%);
}

/* Responsive design */
@media (max-width: 768px) {
  .room-column-header,
  .room-info {
    min-width: 140px;
    max-width: 140px;
  }
  
  .date-column-header,
  .date-cell {
    min-width: 60px;
    max-width: 60px;
  }
  
  .guest-name {
    font-size: 11px;
  }
  
  .reservation-info {
    font-size: 9px;
  }
}
</style>