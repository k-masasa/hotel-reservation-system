import type { CreateReservationRequest, Reservation } from '~/types/reservation'

export const useReservationAPI = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.backendUrl || 'http://localhost:3001'

  const createReservation = async (data: CreateReservationRequest): Promise<{ success: boolean; message?: string; data?: Reservation }> => {
    try {
      const response = await $fetch<{ success: boolean; message?: string; data?: Reservation }>(`${baseURL}/api/reservations`, {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      return response
    } catch (error: any) {
      console.error('API Error:', error)
      
      // Handle validation errors from server
      if (error.data?.details) {
        throw new Error(error.data.details.join(', '))
      }
      
      if (error.data?.message) {
        throw new Error(error.data.message)
      }
      
      throw new Error('予約の登録中にエラーが発生しました')
    }
  }

  const getReservations = async (): Promise<{ success: boolean; data: Reservation[] }> => {
    try {
      const response = await $fetch<{ success: boolean; data: Reservation[] }>(`${baseURL}/api/reservations`)
      return response
    } catch (error: any) {
      console.error('API Error:', error)
      throw new Error('予約一覧の取得中にエラーが発生しました')
    }
  }

  return {
    createReservation,
    getReservations
  }
}