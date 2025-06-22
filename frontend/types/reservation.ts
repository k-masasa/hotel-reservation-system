export interface Reservation {
  id?: number;
  adult_count: number;
  school_child_count: number;
  preschool_child_count: number;
  guest_name: string;
  phone_number: string;
  email: string;
  address?: string;
  birth_year?: number;
  birth_month?: number;
  birth_day?: number;
  check_in_year: number;
  check_in_month: number;
  check_in_day: number;
  check_out_year: number;
  check_out_month: number;
  check_out_day: number;
  room_type?: string;
  room_id?: number;
  total_price: number;
  is_deleted?: boolean;
  is_cancelled?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateReservationRequest {
  adultCount: number;
  schoolChildCount: number;
  preschoolChildCount: number;
  guestName: string;
  phoneNumber: string;
  email: string;
  address?: string;
  birthYear?: number;
  birthMonth?: number;
  birthDay?: number;
  checkInYear: number;
  checkInMonth: number;
  checkInDay: number;
  checkOutYear: number;
  checkOutMonth: number;
  checkOutDay: number;
  roomType?: string;
  roomId?: number;
  totalPrice: number;
}