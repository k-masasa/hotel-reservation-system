import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getReservations = async () => {
  const response = await apiClient.get('/reservations');
  return response.data;
};

export const getReservationById = async (id: number) => {
  const response = await apiClient.get(`/reservations/${id}`);
  return response.data;
};

export const createReservation = async (reservation: any) => {
  const response = await apiClient.post('/reservations', reservation);
  return response.data;
};

export const updateReservation = async (id: number, reservation: any) => {
  const response = await apiClient.put(`/reservations/${id}`, reservation);
  return response.data;
};

export const deleteReservation = async (id: number) => {
  await apiClient.delete(`/reservations/${id}`);
};

export const registerUser = async (userDetails: any) => {
  const response = await apiClient.post('/users/register', userDetails);
  return response.data;
};

export const loginUser = async (credentials: any) => {
  const response = await apiClient.post('/users/login', credentials);
  return response.data;
};
