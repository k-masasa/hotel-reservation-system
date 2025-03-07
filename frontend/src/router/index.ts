import { createRouter, createWebHistory } from 'vue-router';
import ReservationList from '@/components/ReservationList.vue';
import ReservationForm from '@/components/ReservationForm.vue';
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

const routes = [
  {
    path: '/',
    name: 'ReservationList',
    component: ReservationList,
  },
  {
    path: '/reservation/new',
    name: 'CreateReservation',
    component: ReservationForm,
  },
  {
    path: '/reservation/:id',
    name: 'EditReservation',
    component: ReservationForm,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
