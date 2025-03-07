import express from 'express';
import {
  getAllReservations,
  getReservationById,
  createReservation,
  updateReservation,
  deleteReservation
} from '../controllers/reservationsController';

const router = express.Router();

// Get all reservations
router.get('/', getAllReservations);

// Get a reservation by ID
router.get('/:id', getReservationById);

// Create a new reservation
router.post('/', createReservation);

// Update a reservation
router.put('/:id', updateReservation);

// Delete a reservation
router.delete('/:id', deleteReservation);

export default router;
