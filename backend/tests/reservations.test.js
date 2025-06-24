const request = require('supertest');

// Create a proper mock function for the database
const mockQuery = {
  where: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  insert: jest.fn(),
  first: jest.fn(),
  del: jest.fn(),
  find: jest.fn()
};

// Mock database function that returns the query builder
const mockDb = jest.fn(() => mockQuery);
mockDb.destroy = jest.fn();

// Mock the database module - this needs to be at top level
jest.mock('../dist/database/db', () => ({
  default: mockDb
}));

// Now import the app after mocking
const app = require('../dist/app').default;

describe('Reservations API', () => {
  beforeAll(async () => {
    // Setup test database if needed
    // For now, we'll assume database is running and accessible
  });

  afterAll(async () => {
    // Clean up database connections
    await mockDb.destroy();
  });

  beforeEach(async () => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Reset default mock implementations
    mockQuery.where.mockReturnThis();
    mockQuery.orderBy.mockReturnThis();
    mockQuery.insert.mockResolvedValue([1]);
    mockQuery.first.mockResolvedValue(null);
    mockQuery.del.mockResolvedValue(1);
    mockQuery.find.mockResolvedValue([]);
  });

  describe('GET /api/reservations', () => {
    it('should return empty array when no reservations exist', async () => {
      // Mock empty result
      mockQuery.where.mockReturnThis();
      mockQuery.orderBy.mockResolvedValue([]);

      const response = await request(app)
        .get('/api/reservations')
        .expect(200);

      expect(response.body).toEqual({
        success: true,
        data: []
      });
      expect(mockQuery.where).toHaveBeenCalledWith('is_deleted', false);
    });

    it('should return reservations when they exist', async () => {
      // Mock reservation data
      const testReservations = [{
        id: 1,
        guest_name: 'Test Guest',
        phone_number: '090-1234-5678',
        email: 'test@example.com',
        adult_count: 2,
        school_child_count: 0,
        preschool_child_count: 0,
        total_price: 10000,
        is_deleted: false
      }];

      mockQuery.where.mockReturnThis();
      mockQuery.orderBy.mockResolvedValue(testReservations);

      const response = await request(app)
        .get('/api/reservations')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual(testReservations);
      expect(mockQuery.where).toHaveBeenCalledWith('is_deleted', false);
    });

    it('should not return deleted reservations', async () => {
      // Mock that only non-deleted reservations are returned
      mockQuery.where.mockReturnThis();
      mockQuery.orderBy.mockResolvedValue([]);

      const response = await request(app)
        .get('/api/reservations')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(mockQuery.where).toHaveBeenCalledWith('is_deleted', false);
    });
  });

  describe('POST /api/reservations', () => {
    const validReservationData = {
      adultCount: 2,
      schoolChildCount: 1,
      preschoolChildCount: 0,
      guestName: 'Test Reservation User',
      phoneNumber: '090-1111-2222',
      email: 'reservation@example.com',
      address: 'Test Address 123',
      birthYear: 1990,
      birthMonth: 5,
      birthDay: 15,
      checkInYear: 2025,
      checkInMonth: 12,
      checkInDay: 25,
      checkOutYear: 2025,
      checkOutMonth: 12,
      checkOutDay: 27,
      roomType: 'スタンダード',
      roomId: 101,
      totalPrice: 15000
    };

    it('should create a reservation with valid data', async () => {
      mockQuery.insert.mockResolvedValue([1]);
      mockQuery.where.mockReturnThis();
      mockQuery.first.mockResolvedValue({
        id: 1,
        guest_name: 'Test Reservation User',
        phone_number: '090-1111-2222',
        email: 'reservation@example.com',
        adult_count: 2,
        school_child_count: 1,
        preschool_child_count: 0,
        total_price: 15000,
        is_deleted: false,
        is_cancelled: false
      });

      const response = await request(app)
        .post('/api/reservations')
        .send(validReservationData)
        .expect(201);

      expect(response.body).toMatchObject({
        success: true,
        message: '予約が正常に登録されました',
        data: expect.objectContaining({
          id: expect.any(Number),
          guest_name: 'Test Reservation User',
          phone_number: '090-1111-2222',
          email: 'reservation@example.com',
          adult_count: 2,
          school_child_count: 1,
          preschool_child_count: 0,
          total_price: 15000,
          is_deleted: false,
          is_cancelled: false
        })
      });
    });

    it('should reject reservation with missing required fields', async () => {
      const invalidData = { ...validReservationData };
      delete invalidData.guestName;

      const response = await request(app)
        .post('/api/reservations')
        .send(invalidData)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: 'Validation Error',
        message: '入力データに不備があります'
      });
    });

    it('should reject reservation with past check-in date', async () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      
      const invalidData = {
        ...validReservationData,
        checkInYear: pastDate.getFullYear(),
        checkInMonth: pastDate.getMonth() + 1,
        checkInDay: pastDate.getDate()
      };

      const response = await request(app)
        .post('/api/reservations')
        .send(invalidData)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: 'Validation Error',
        message: 'チェックイン日は本日以降の日付を選択してください'
      });
    });

    it('should reject reservation where check-out is before check-in', async () => {
      const invalidData = {
        ...validReservationData,
        checkInYear: 2025,
        checkInMonth: 12,
        checkInDay: 27,
        checkOutYear: 2025,
        checkOutMonth: 12,
        checkOutDay: 25  // Before check-in
      };

      const response = await request(app)
        .post('/api/reservations')
        .send(invalidData)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: 'Validation Error',
        message: 'チェックアウト日はチェックイン日より後の日付を選択してください'
      });
    });

    it('should reject reservation where check-out equals check-in', async () => {
      const invalidData = {
        ...validReservationData,
        checkInYear: 2025,
        checkInMonth: 12,
        checkInDay: 25,
        checkOutYear: 2025,
        checkOutMonth: 12,
        checkOutDay: 25  // Same as check-in
      };

      const response = await request(app)
        .post('/api/reservations')
        .send(invalidData)
        .expect(400);

      expect(response.body).toMatchObject({
        success: false,
        error: 'Validation Error',
        message: 'チェックアウト日はチェックイン日より後の日付を選択してください'
      });
    });
  });
});