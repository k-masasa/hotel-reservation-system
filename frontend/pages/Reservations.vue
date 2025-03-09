<template>
  <div>
    <h1>Reservations</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Check-in Date</th>
          <th>Check-out Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in reservations" :key="reservation.id">
          <td>{{ reservation.id }}</td>
          <td>{{ reservation.name }}</td>
          <td>{{ reservation.checkInDate }}</td>
          <td>{{ reservation.checkOutDate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from 'axios'

export default defineComponent({
  setup() {
    const reservations = ref([])

    const fetchReservations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/reservations')
        reservations.value = response.data
      } catch (error) {
        console.error('Failed to fetch reservations', error)
      }
    }

    onMounted(() => {
      fetchReservations()
    })

    return {
      reservations
    }
  }
})
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>
