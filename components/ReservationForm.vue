<template>
  <v-form ref="formRef" @submit.prevent="onSubmit">
    <v-container>
      <!-- 人数入力セクション -->
      <v-row>
        <v-col cols="12">
          <h3 class="text-h6 mb-4">
            <v-icon class="mr-2">mdi-account-group</v-icon>
            宿泊人数
          </h3>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="formData.adultCount"
            label="大人人数"
            type="number"
            min="1"
            :rules="adultCountRules"
            required
            prepend-icon="mdi-account"
            suffix="名"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="formData.schoolChildCount"
            label="就学児人数"
            type="number"
            min="0"
            :rules="schoolChildCountRules"
            required
            prepend-icon="mdi-school"
            suffix="名"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            v-model.number="formData.preschoolChildCount"
            label="未就学児人数"
            type="number"
            min="0"
            :rules="preschoolChildCountRules"
            required
            prepend-icon="mdi-baby-face"
            suffix="名"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-divider class="my-6"></v-divider>

      <!-- お客様情報セクション -->
      <v-row>
        <v-col cols="12">
          <h3 class="text-h6 mb-4">
            <v-icon class="mr-2">mdi-account-circle</v-icon>
            お客様情報
          </h3>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.guestName"
            label="お客様名"
            prepend-icon="mdi-account"
            :rules="nameRules"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.phoneNumber"
            label="電話番号"
            type="tel"
            :rules="phoneRules"
            required
            prepend-icon="mdi-phone"
            placeholder="090-1234-5678"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.email"
            label="メールアドレス"
            type="email"
            :rules="emailRules"
            required
            prepend-icon="mdi-email"
            placeholder="example@example.com"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="formData.address"
            label="住所"
            prepend-icon="mdi-map-marker"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <div class="mb-2">
            <label class="text-subtitle-2">生年月日 <span class="text-error">*</span></label>
          </div>
          <v-row>
            <v-col cols="4">
              <v-select
                v-model="formData.birthYear"
                :items="BIRTH_YEARS"
                label="年"
                :rules="birthYearRules"
                required
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="formData.birthMonth"
                :items="BIRTH_MONTHS"
                label="月"
                :rules="birthMonthRules"
                required
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="formData.birthDay"
                :items="BIRTH_DAYS"
                label="日"
                :rules="birthDayRules"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-divider class="my-6"></v-divider>

      <!-- 宿泊情報セクション -->
      <v-row>
        <v-col cols="12">
          <h3 class="text-h6 mb-4">
            <v-icon class="mr-2">mdi-bed</v-icon>
            宿泊情報
          </h3>
        </v-col>
        <v-col cols="12" md="6">
          <div class="mb-2">
            <label class="text-subtitle-2">チェックイン日</label>
          </div>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model.number="formData.checkInYear"
                label="年"
                type="number"
                :min="new Date().getFullYear()"
                :max="new Date().getFullYear() + 1"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.number="formData.checkInMonth"
                label="月"
                type="number"
                min="1"
                max="12"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.number="formData.checkInDay"
                label="日"
                type="number"
                min="1"
                max="31"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <div class="mb-2">
            <label class="text-subtitle-2">チェックアウト日</label>
          </div>
          <v-row>
            <v-col cols="4">
              <v-text-field
                v-model.number="formData.checkOutYear"
                label="年"
                type="number"
                :min="new Date().getFullYear()"
                :max="new Date().getFullYear() + 1"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.number="formData.checkOutMonth"
                label="月"
                type="number"
                min="1"
                max="12"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model.number="formData.checkOutDay"
                label="日"
                type="number"
                min="1"
                max="31"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="formData.roomType"
            :items="ROOM_TYPES"
            label="部屋タイプ"
            :rules="roomTypeRules"
            required
            prepend-icon="mdi-bed"
            @update:model-value="onRoomTypeChange"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="formData.roomId"
            :items="availableRooms"
            item-title="text"
            item-value="value"
            label="部屋選択"
            prepend-icon="mdi-door"
            :disabled="!formData.roomType"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model.number="formData.totalPrice"
            label="宿泊料金"
            type="number"
            prepend-icon="mdi-currency-jpy"
            suffix="円"
            readonly
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ROOM_TYPES, BIRTH_YEARS, BIRTH_MONTHS, BIRTH_DAYS, ROOM_CAPACITY_MAP, type RoomType } from '~/lib/constants'

// Props
interface Props {
  initialData?: Partial<ReservationFormData>
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  readonly: false
})

// Emits
const emit = defineEmits<{
  submit: [data: ReservationFormData]
  update: [data: ReservationFormData]
}>()

// Types
interface ReservationFormData {
  adultCount: number
  schoolChildCount: number
  preschoolChildCount: number
  guestName: string
  phoneNumber: string
  email: string
  address: string
  birthYear: number | null
  birthMonth: number | null
  birthDay: number | null
  checkInYear: number | null
  checkInMonth: number | null
  checkInDay: number | null
  checkOutYear: number | null
  checkOutMonth: number | null
  checkOutDay: number | null
  roomType: RoomType | null
  roomId: number | null
  totalPrice: number
}

interface Room {
  id: number
  number: string
  type: string
  capacity: number
}

// Form ref
const formRef = ref()

// Sample rooms data (should match the existing data structure)
const rooms = ref<Room[]>([
  { id: 1, number: '101', type: 'スタンダード', capacity: 2 },
  { id: 2, number: '102', type: 'スタンダード', capacity: 2 },
  { id: 3, number: '201', type: 'デラックス', capacity: 3 },
  { id: 4, number: '202', type: 'デラックス', capacity: 3 },
  { id: 5, number: '301', type: 'スイート', capacity: 4 },
  { id: 6, number: '302', type: 'スイート', capacity: 4 },
])

// Form data
const formData = ref<ReservationFormData>({
  adultCount: 1,
  schoolChildCount: 0,
  preschoolChildCount: 0,
  guestName: '',
  phoneNumber: '',
  email: '',
  address: '',
  birthYear: null,
  birthMonth: null,
  birthDay: null,
  checkInYear: null,
  checkInMonth: null,
  checkInDay: null,
  checkOutYear: null,
  checkOutMonth: null,
  checkOutDay: null,
  roomType: null,
  roomId: null,
  totalPrice: 0,
  ...props.initialData
})

// Validation rules
const adultCountRules = [
  (v: number) => !!v || '大人人数は必須です',
  (v: number) => v >= 1 || '大人は1名以上必要です'
]

const schoolChildCountRules = [
  (v: number) => v !== null && v !== undefined || '就学児人数は必須です',
  (v: number) => v >= 0 || '0以上の数値を入力してください'
]

const preschoolChildCountRules = [
  (v: number) => v !== null && v !== undefined || '未就学児人数は必須です',
  (v: number) => v >= 0 || '0以上の数値を入力してください'
]

const nameRules = [
  (v: string) => v.length <= 100 || '100文字以内で入力してください'
]

const phoneRules = [
  (v: string) => !!v || '電話番号は必須です',
  (v: string) => /^[\d-+()]+$/.test(v) || '正しい電話番号を入力してください'
]

const emailRules = [
  (v: string) => !!v || 'メールアドレスは必須です',
  (v: string) => /.+@.+\..+/.test(v) || '正しいメールアドレスを入力してください'
]

const birthYearRules = [
  (v: number) => !!v || '生年は必須です'
]

const birthMonthRules = [
  (v: number) => !!v || '月は必須です'
]

const birthDayRules = [
  (v: number) => !!v || '日は必須です'
]

const roomTypeRules = [
  (v: string) => !!v || '部屋タイプは必須です'
]

// Computed
const availableRooms = computed(() => {
  if (!formData.value.roomType) return []
  
  return rooms.value
    .filter(room => room.type === formData.value.roomType)
    .map(room => ({
      value: room.id,
      text: `${room.number} (${room.capacity}名まで)`
    }))
})

const totalGuests = computed(() => {
  return formData.value.adultCount + formData.value.schoolChildCount + formData.value.preschoolChildCount
})

// Methods
const onRoomTypeChange = () => {
  formData.value.roomId = null
  // Simple price calculation based on room type
  const basePrice = {
    'スタンダード': 8000,
    'デラックス': 12000,
    'スイート': 20000
  }
  
  if (formData.value.roomType) {
    const nights = calculateNights()
    formData.value.totalPrice = basePrice[formData.value.roomType] * nights * totalGuests.value
  }
}

const calculateNights = (): number => {
  const { checkInYear, checkInMonth, checkInDay, checkOutYear, checkOutMonth, checkOutDay } = formData.value
  
  if (!checkInYear || !checkInMonth || !checkInDay || !checkOutYear || !checkOutMonth || !checkOutDay) {
    return 1
  }
  
  const checkIn = new Date(checkInYear, checkInMonth - 1, checkInDay)
  const checkOut = new Date(checkOutYear, checkOutMonth - 1, checkOutDay)
  const diffTime = checkOut.getTime() - checkIn.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  return Math.max(1, diffDays)
}

const validate = async (): Promise<boolean> => {
  if (!formRef.value) return false
  const { valid } = await formRef.value.validate()
  return valid
}

const onSubmit = () => {
  emit('submit', formData.value)
}

// Watch for form changes to emit updates
watch(formData, (newData) => {
  emit('update', newData)
}, { deep: true })

// Watch for price recalculation
watch([
  () => formData.value.checkInYear,
  () => formData.value.checkInMonth,
  () => formData.value.checkInDay,
  () => formData.value.checkOutYear,
  () => formData.value.checkOutMonth,
  () => formData.value.checkOutDay,
  () => formData.value.roomType,
  totalGuests
], () => {
  if (formData.value.roomType) {
    onRoomTypeChange()
  }
})

// Expose validation method
defineExpose({
  validate,
  formData
})
</script>

<style scoped lang="scss">
.text-error {
  color: rgb(var(--v-theme-error));
}
</style>