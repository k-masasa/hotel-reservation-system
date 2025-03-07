<template>
  <div>
    <button @click="deleteReservation">Delete Reservation</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useReservationStore } from '@/store/reservationStore';

const props = defineProps<{ reservationId: number }>();
const reservationStore = useReservationStore();

const deleteReservation = async () => {
  try {
    await reservationStore.deleteReservation(props.reservationId);
    alert('Reservation deleted successfully');
  } catch (error) {
    alert('Failed to delete reservation');
  }
};
</script>
