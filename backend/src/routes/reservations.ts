import { Router, Request, Response } from 'express';
import db from '../database/db';
import { Reservation, CreateReservationRequest } from '../types/reservation';
import { createReservationSchema } from '../validation/reservationValidation';

const router = Router();

// GET /api/reservations - Get all reservations
router.get('/', async (req: Request, res: Response) => {
  try {
    const reservations = await db<Reservation>('reservations')
      .where('is_deleted', false)
      .orderBy('created_at', 'desc');
    
    res.json({
      success: true,
      data: reservations
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: '予約一覧の取得中にエラーが発生しました'
    });
  }
});

// POST /api/reservations - Create a new reservation
router.post('/', async (req: Request, res: Response) => {
  try {
    // Validate request body
    const { error, value } = createReservationSchema.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: '入力データに不備があります',
        details: error.details.map(detail => detail.message)
      });
    }
    
    const requestData: CreateReservationRequest = value;
    
    // Additional validation for check-in/check-out dates
    const checkInDate = new Date(requestData.checkInYear, requestData.checkInMonth - 1, requestData.checkInDay);
    const checkOutDate = new Date(requestData.checkOutYear, requestData.checkOutMonth - 1, requestData.checkOutDay);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'チェックイン日は本日以降の日付を選択してください'
      });
    }
    
    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'チェックアウト日はチェックイン日より後の日付を選択してください'
      });
    }
    
    // Convert camelCase to snake_case for database
    const reservationData: Omit<Reservation, 'id' | 'created_at' | 'updated_at'> = {
      adult_count: requestData.adultCount,
      school_child_count: requestData.schoolChildCount,
      preschool_child_count: requestData.preschoolChildCount,
      guest_name: requestData.guestName,
      phone_number: requestData.phoneNumber,
      email: requestData.email,
      address: requestData.address,
      birth_year: requestData.birthYear,
      birth_month: requestData.birthMonth,
      birth_day: requestData.birthDay,
      check_in_year: requestData.checkInYear,
      check_in_month: requestData.checkInMonth,
      check_in_day: requestData.checkInDay,
      check_out_year: requestData.checkOutYear,
      check_out_month: requestData.checkOutMonth,
      check_out_day: requestData.checkOutDay,
      room_type: requestData.roomType,
      room_id: requestData.roomId,
      total_price: requestData.totalPrice,
      is_deleted: false,
      is_cancelled: false
    };
    
    // Insert reservation
    const [reservationId] = await db<Reservation>('reservations').insert(reservationData);
    
    // Fetch the created reservation
    const createdReservation = await db<Reservation>('reservations')
      .where('id', reservationId)
      .first();
    
    res.status(201).json({
      success: true,
      message: '予約が正常に登録されました',
      data: createdReservation
    });
    
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({
      success: false,
      error: 'Internal Server Error',
      message: '予約の登録中にエラーが発生しました'
    });
  }
});

export default router;