import { Request, Response } from 'express';
import { Reservation } from '../models/reservation';
import { db } from '../db';

// Get all reservations
export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM reservations');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error });
  }
};

// Get a reservation by ID
export const getReservationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM reservations WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservation', error });
  }
};

// Create a new reservation
export const createReservation = async (req: Request, res: Response) => {
  const { guestName, roomNumber, checkInDate, checkOutDate } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO reservations (guestName, roomNumber, checkInDate, checkOutDate) VALUES (?, ?, ?, ?)',
      [guestName, roomNumber, checkInDate, checkOutDate]
    );
    res.status(201).json({ id: result.insertId, guestName, roomNumber, checkInDate, checkOutDate });
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation', error });
  }
};

// Update a reservation
export const updateReservation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { guestName, roomNumber, checkInDate, checkOutDate } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE reservations SET guestName = ?, roomNumber = ?, checkInDate = ?, checkOutDate = ? WHERE id = ?',
      [guestName, roomNumber, checkInDate, checkOutDate, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.json({ id, guestName, roomNumber, checkInDate, checkOutDate });
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation', error });
  }
};

// Delete a reservation
export const deleteReservation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM reservations WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reservation', error });
  }
};
