import { createStore } from 'vuex';
import axios from 'axios';

const reservationStore = {
  state: {
    reservations: [],
  },
  mutations: {
    SET_RESERVATIONS(state, reservations) {
      state.reservations = reservations;
    },
    ADD_RESERVATION(state, reservation) {
      state.reservations.push(reservation);
    },
    UPDATE_RESERVATION(state, updatedReservation) {
      const index = state.reservations.findIndex(
        (reservation) => reservation.id === updatedReservation.id
      );
      if (index !== -1) {
        state.reservations.splice(index, 1, updatedReservation);
      }
    },
    DELETE_RESERVATION(state, reservationId) {
      state.reservations = state.reservations.filter(
        (reservation) => reservation.id !== reservationId
      );
    },
  },
  actions: {
    async fetchReservations({ commit }) {
      try {
        const response = await axios.get('/api/reservations');
        commit('SET_RESERVATIONS', response.data);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    },
    async createReservation({ commit }, reservation) {
      try {
        const response = await axios.post('/api/reservations', reservation);
        commit('ADD_RESERVATION', response.data);
      } catch (error) {
        console.error('Error creating reservation:', error);
      }
    },
    async updateReservation({ commit }, reservation) {
      try {
        const response = await axios.put(
          `/api/reservations/${reservation.id}`,
          reservation
        );
        commit('UPDATE_RESERVATION', response.data);
      } catch (error) {
        console.error('Error updating reservation:', error);
      }
    },
    async deleteReservation({ commit }, reservationId) {
      try {
        await axios.delete(`/api/reservations/${reservationId}`);
        commit('DELETE_RESERVATION', reservationId);
      } catch (error) {
        console.error('Error deleting reservation:', error);
      }
    },
  },
  getters: {
    allReservations: (state) => state.reservations,
  },
};

const store = createStore({
  modules: {
    reservation: reservationStore,
  },
});

export default store;
