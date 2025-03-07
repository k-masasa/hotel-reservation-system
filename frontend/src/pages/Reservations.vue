<template>
  <div>
    <h1>Reservations</h1>
    <ReservationList />
    <ReservationForm />
    <ReservationDelete />
  </div>
</template>

<script setup>
import ReservationList from '../components/ReservationList.vue';
import ReservationForm from '../components/ReservationForm.vue';
import ReservationDelete from '../components/ReservationDelete.vue';
</script>
