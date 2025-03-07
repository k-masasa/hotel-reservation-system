import { createStore } from 'vuex';

const store = createStore({
  state: {
    reservations: [],
    user: null,
  },
  mutations: {
    setReservations(state, reservations) {
      state.reservations = reservations;
    },
    addReservation(state, reservation) {
      state.reservations.push(reservation);
    },
    updateReservation(state, updatedReservation) {
      const index = state.reservations.findIndex(r => r.id === updatedReservation.id);
      if (index !== -1) {
        state.reservations.splice(index, 1, updatedReservation);
      }
    },
    deleteReservation(state, reservationId) {
      state.reservations = state.reservations.filter(r => r.id !== reservationId);
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async fetchReservations({ commit }) {
      const response = await fetch('/api/reservations');
      const data = await response.json();
      commit('setReservations', data);
    },
    async createReservation({ commit }, reservation) {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });
      const data = await response.json();
      commit('addReservation', data);
    },
    async updateReservation({ commit }, reservation) {
      const response = await fetch(`/api/reservations/${reservation.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      });
      const data = await response.json();
      commit('updateReservation', data);
    },
    async deleteReservation({ commit }, reservationId) {
      await fetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE',
      });
      commit('deleteReservation', reservationId);
    },
    async login({ commit }, credentials) {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      commit('setUser', data);
    },
    async register({ commit }, userDetails) {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });
      const data = await response.json();
      commit('setUser', data);
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.user;
    },
  },
});

export default store;
