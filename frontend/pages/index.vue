<template>
  <div>
    <h1>Welcome to the Hotel Reservation System</h1>
    <p>
      <nuxt-link to="/reservations">Go to Reservations</nuxt-link>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage'
})
</script>

<style scoped>
h1 {
  color: #2c3e50;
  margin-bottom: 20px;
}

p {
  font-size: 18px;
}
</style>
