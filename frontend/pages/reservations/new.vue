<template>
  <v-container fluid class="pa-6">
        <!-- Header -->
        <v-row class="mb-6">
          <v-col>
            <div class="d-flex align-center mb-4">
              <v-btn
                icon="mdi-arrow-left"
                variant="text"
                color="primary"
                @click="goBack"
                class="mr-3"
              ></v-btn>
              <v-icon size="32" color="primary" class="mr-3">mdi-plus-circle</v-icon>
              <h1 class="text-h4 font-weight-bold text-primary">新規予約登録</h1>
            </div>
            <p class="text-subtitle-1 text-grey-darken-1">
              お客様の予約情報を入力してください
            </p>
          </v-col>
        </v-row>

        <!-- Form Card -->
        <v-row>
          <v-col>
            <v-card elevation="3">
              <v-card-title class="bg-primary text-white pa-4">
                <v-icon class="mr-2">mdi-file-document-edit</v-icon>
                予約情報入力
              </v-card-title>
              
              <v-card-text class="pa-6">
                <ReservationForm
                  ref="reservationFormRef"
                  @submit="handleSubmit"
                  @update="handleFormUpdate"
                />
              </v-card-text>

              <v-card-actions class="pa-6 pt-0">
                <v-btn
                  color="grey"
                  variant="outlined"
                  prepend-icon="mdi-arrow-left"
                  @click="goBack"
                  class="mr-4"
                >
                  戻る
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  prepend-icon="mdi-content-save"
                  @click="submitForm"
                  :loading="isSubmitting"
                  size="large"
                >
                  登録
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// Page meta
definePageMeta({
  title: 'ホテル予約管理システム - 新規予約登録'
})

// Composables
const router = useRouter()

// Reactive data
const isSubmitting = ref(false)
const reservationFormRef = ref()

// Methods
const goBack = () => {
  // Go back to the previous page instead of hardcoding /reservations
  if (window.history.length > 1) {
    router.back()
  } else {
    // Fallback to reservations page if no history
    router.push('/reservations')
  }
}

const handleFormUpdate = (formData: any) => {
  // Handle form data updates if needed
  console.log('Form updated:', formData)
}

const handleSubmit = async (formData: any) => {
  await submitReservation(formData)
}

const submitForm = async () => {
  if (!reservationFormRef.value) return
  
  // Validate form
  const isValid = await reservationFormRef.value.validate()
  if (!isValid) {
    return
  }
  
  // Get form data and submit
  const formData = reservationFormRef.value.formData
  await submitReservation(formData)
}

const submitReservation = async (formData: any) => {
  isSubmitting.value = true
  
  try {
    const { createReservation } = useReservationAPI()
    
    // Convert form data to API request format
    const requestData = {
      adultCount: formData.adultCount,
      schoolChildCount: formData.schoolChildCount,
      preschoolChildCount: formData.preschoolChildCount,
      guestName: formData.guestName,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      address: formData.address,
      birthYear: formData.birthYear,
      birthMonth: formData.birthMonth,
      birthDay: formData.birthDay,
      checkInYear: formData.checkInYear,
      checkInMonth: formData.checkInMonth,
      checkInDay: formData.checkInDay,
      checkOutYear: formData.checkOutYear,
      checkOutMonth: formData.checkOutMonth,
      checkOutDay: formData.checkOutDay,
      roomType: formData.roomType,
      roomId: formData.roomId,
      totalPrice: formData.totalPrice
    }
    
    const response = await createReservation(requestData)
    
    if (response.success) {
      // Show success alert
      alert('予約が正常に登録されました。')
      
      // Navigate to calendar page (reservations page as fallback)
      router.push('/reservations')
    } else {
      throw new Error(response.message || '予約の登録に失敗しました')
    }
    
  } catch (error: any) {
    console.error('Error submitting reservation:', error)
    alert(error.message || '予約の登録中にエラーが発生しました。もう一度お試しください。')
  } finally {
    isSubmitting.value = false
  }
}

// Head configuration
useHead({
  title: 'ホテル予約管理システム - 新規予約登録',
  meta: [
    {
      name: 'description',
      content: 'ホテルの新規予約を登録するページです。'
    }
  ]
})
</script>

<style scoped lang="scss">
// Custom styles if needed
</style>