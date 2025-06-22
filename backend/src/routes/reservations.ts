import { Router, Request, Response } from 'express';
import db from '../database/db';
import { Reservation, CreateReservationRequest } from '../types/reservation';
import { createReservationSchema } from '../validation/reservationValidation';

const router = Router();

// GET /api/reservations - Get all reservations
router.get('/', async (_req: Request, res: Response) => {
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
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    // Validate request body
    const { error, value } = createReservationSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: '入力データに不備があります',
        details: error.details.map(detail => detail.message)
      });
      return;
    }
    
    const requestData: CreateReservationRequest = value;
    
    // Additional validation for check-in/check-out dates
    const checkInDate = new Date(requestData.checkInYear, requestData.checkInMonth - 1, requestData.checkInDay);
    const checkOutDate = new Date(requestData.checkOutYear, requestData.checkOutMonth - 1, requestData.checkOutDay);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (checkInDate < today) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'チェックイン日は本日以降の日付を選択してください'
      });
      return;
    }
    
    if (checkOutDate <= checkInDate) {
      res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'チェックアウト日はチェックイン日より後の日付を選択してください'
      });
      return;
    }
    
    // Convert camelCase to snake_case for database
    const reservationData: Partial<Reservation> = {
      adult_count: requestData.adultCount,
      school_child_count: requestData.schoolChildCount,
      preschool_child_count: requestData.preschoolChildCount,
      guest_name: requestData.guestName,
      phone_number: requestData.phoneNumber,
      email: requestData.email,
      address: requestData.address || undefined,
      birth_year: requestData.birthYear || undefined,
      birth_month: requestData.birthMonth || undefined,
      birth_day: requestData.birthDay || undefined,
      check_in_year: requestData.checkInYear,
      check_in_month: requestData.checkInMonth,
      check_in_day: requestData.checkInDay,
      check_out_year: requestData.checkOutYear,
      check_out_month: requestData.checkOutMonth,
      check_out_day: requestData.checkOutDay,
      room_type: requestData.roomType || undefined,
      room_id: requestData.roomId || undefined,
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