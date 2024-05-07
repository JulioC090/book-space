import LoadSpaceBookings from '@/domain/usecases/LoadSpaceBookings';
import timeToDateConverter from '@/presentation/helpers/timeToDateConverter';

const mockCheckUserSpaceAccessRepository = {
  verifyUserAccess: jest.fn(),
};

const mockLoadBookingsByDayRepository = {
  loadBookingsByDay: jest.fn(),
};
describe('LoadSpaceBookings', () => {
  let loadSpaceBookings: LoadSpaceBookings;

  beforeEach(() => {
    loadSpaceBookings = new LoadSpaceBookings(
      mockCheckUserSpaceAccessRepository,
      mockLoadBookingsByDayRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should return null if user does not have access to space', async () => {
    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      false,
    );

    const result = await loadSpaceBookings.load(
      'userId',
      'spaceId',
      new Date('2024-02-05'),
    );

    expect(result).toBeNull();
  });

  test('It should return bookings if user has access to the space and bookings are loaded', async () => {
    const mockBookings = [
      {
        id: 'bookingId',
        day: new Date('2024-02-05'),
        startTime: timeToDateConverter('10:00:00'),
        endTime: timeToDateConverter('11:00:00'),
        spaceId: 'spaceId',
        userId: 'userId',
      },
      {
        id: 'bookingId',
        day: new Date('2024-02-05'),
        startTime: timeToDateConverter('12:00:00'),
        endTime: timeToDateConverter('13:00:00'),
        spaceId: 'spaceId',
        userId: 'userId',
      },
    ];

    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      true,
    );

    mockLoadBookingsByDayRepository.loadBookingsByDay.mockResolvedValueOnce(
      mockBookings,
    );

    const result = await loadSpaceBookings.load(
      'userId',
      'spaceId',
      new Date('2024-02-05'),
    );

    expect(result).toEqual(
      mockBookings.map((booking) => ({
        id: booking.id,
        userId: booking.userId,
        startTime: booking.startTime,
        endTime: booking.endTime,
      })),
    );
  });
});
