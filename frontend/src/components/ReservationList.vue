<template>
  <div>
    <h1>Reservation List</h1>
    <ul>
      <li v-for="reservation in reservations" :key="reservation.id">
        {{ reservation.name }} - {{ reservation.date }}
        <button @click="editReservation(reservation.id)">Edit</button>
        <button @click="deleteReservation(reservation.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'ReservationList',
  setup() {
    const store = useStore();
    const router = useRouter();
    const reservations = ref([]);

    onMounted(async () => {
      await store.dispatch('fetchReservations');
      reservations.value = store.state.reservations;
    });

    const editReservation = (id: number) => {
      router.push({ name: 'EditReservation', params: { id } });
    };

    const deleteReservation = async (id: number) => {
      await store.dispatch('deleteReservation', id);
      await store.dispatch('fetchReservations');
      reservations.value = store.state.reservations;
    };

    return {
      reservations,
      editReservation,
      deleteReservation,
    };
  },
});
</script>

<style scoped>
h1 {
  font-size: 2em;
  margin-bottom: 0.5em;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 0;
  border-bottom: 1px solid #ccc;
}

button {
  margin-left: 0.5em;
}
</style>
