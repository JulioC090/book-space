import IAddBook from '@/domain/protocols/usecases/IAddBook';
import AddBook from '@/domain/usecases/AddBook';
import timeToDateConverter from '@/presentation/helpers/timeToDateConverter';

const mockCheckUserSpaceAccessRepository = {
  verifyUserAccess: jest.fn(),
};

const mockLoadSpaceAvailabilityRepository = {
  loadSpaceAvailability: jest.fn(),
};

const mockLoadBookingsByDayRepository = {
  loadBookingsByDay: jest.fn(),
};

const mockAddBookingRepository = {
  addBooking: jest.fn(),
};

jest
  .spyOn(Date, 'now')
  .mockReturnValue(new Date('2022-05-01T00:00:00Z').getTime());

describe('AddBook', () => {
  let addBook: IAddBook;

  beforeEach(() => {
    addBook = new AddBook(
      mockCheckUserSpaceAccessRepository,
      mockLoadSpaceAvailabilityRepository,
      mockLoadBookingsByDayRepository,
      mockAddBookingRepository,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should return null if booking day is in the past', async () => {
    const result = await addBook.add('userId', 'spaceId', {
      day: new Date('2022-04-01T00:00:00Z'),
      startTime: new Date(),
      endTime: new Date(),
    });

    expect(result).toBeNull();
  });

  test('It should return null if user does not have access to space', async () => {
    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      false,
    );

    const result = await addBook.add('userId', 'spaceId', {
      day: new Date(),
      startTime: new Date(),
      endTime: new Date(),
    });

    expect(result).toBeNull();
  });

  test('It should return null if space is not available at the specified time', async () => {
    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      true,
    );
    mockLoadSpaceAvailabilityRepository.loadSpaceAvailability.mockResolvedValueOnce(
      [
        {
          weekday: 0,
          startTime: timeToDateConverter('00:00:00'),
          endTime: timeToDateConverter('02:00:00'),
        },
      ],
    );

    let result = await addBook.add('userId', 'spaceId', {
      day: new Date('2024-02-04'),
      startTime: timeToDateConverter('04:00:00'),
      endTime: timeToDateConverter('06:00:00'),
    });

    expect(result).toBeNull();

    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      true,
    );
    mockLoadSpaceAvailabilityRepository.loadSpaceAvailability.mockResolvedValueOnce(
      [
        {
          weekday: 6,
          startTime: timeToDateConverter('00:00:00'),
          endTime: timeToDateConverter('02:00:00'),
        },
      ],
    );

    result = await addBook.add('userId', 'spaceId', {
      day: new Date('2024-02-04'),
      startTime: timeToDateConverter('04:00:00'),
      endTime: timeToDateConverter('06:00:00'),
    });

    expect(result).toBeNull();

    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      true,
    );
    mockLoadSpaceAvailabilityRepository.loadSpaceAvailability.mockResolvedValueOnce(
      [
        {
          weekday: 6,
          startTime: timeToDateConverter('04:00:00'),
          endTime: timeToDateConverter('06:00:00'),
        },
      ],
    );

    result = await addBook.add('userId', 'spaceId', {
      day: new Date('2024-02-04'),
      startTime: timeToDateConverter('07:00:00'),
      endTime: timeToDateConverter('08:00:00'),
    });

    expect(result).toBeNull();

    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      true,
    );
    mockLoadSpaceAvailabilityRepository.loadSpaceAvailability.mockResolvedValueOnce(
      [
        {
          weekday: 6,
          startTime: timeToDateConverter('04:00:00'),
          endTime: timeToDateConverter('06:00:00'),
        },
      ],
    );

    result = await addBook.add('userId', 'spaceId', {
      day: new Date('2024-02-04'),
      startTime: timeToDateConverter('02:00:00'),
      endTime: timeToDateConverter('05:00:00'),
    });

    expect(result).toBeNull();

    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      true,
    );
    mockLoadSpaceAvailabilityRepository.loadSpaceAvailability.mockResolvedValueOnce(
      [
        {
          weekday: 6,
          startTime: timeToDateConverter('04:00:00'),
          endTime: timeToDateConverter('06:00:00'),
        },
      ],
    );

    result = await addBook.add('userId', 'spaceId', {
      day: new Date('2024-02-04'),
      startTime: timeToDateConverter('05:00:00'),
      endTime: timeToDateConverter('07:00:00'),
    });

    expect(result).toBeNull();
  });

  test('It should return null if there is a time conflict with existing bookings', async () => {
    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      true,
    );
    mockLoadSpaceAvailabilityRepository.loadSpaceAvailability.mockResolvedValueOnce(
      [],
    );
    mockLoadBookingsByDayRepository.loadBookingsByDay.mockResolvedValueOnce([
      {
        startTime: timeToDateConverter('03:00:00'),
        endTime: timeToDateConverter('05:00:00'),
      },
    ]);

    let result = await addBook.add('userId', 'spaceId', {
      day: new Date('2024-02-04'),
      startTime: timeToDateConverter('04:00:00'),
      endTime: timeToDateConverter('06:00:00'),
    });

    expect(result).toBeNull();

    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      true,
    );
    mockLoadSpaceAvailabilityRepository.loadSpaceAvailability.mockResolvedValueOnce(
      [],
    );
    mockLoadBookingsByDayRepository.loadBookingsByDay.mockResolvedValueOnce([
      {
        startTime: timeToDateConverter('05:00:00'),
        endTime: timeToDateConverter('07:00:00'),
      },
    ]);

    result = await addBook.add('userId', 'spaceId', {
      day: new Date('2024-02-04'),
      startTime: timeToDateConverter('04:00:00'),
      endTime: timeToDateConverter('06:00:00'),
    });

    expect(result).toBeNull();

    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      true,
    );
    mockLoadSpaceAvailabilityRepository.loadSpaceAvailability.mockResolvedValueOnce(
      [],
    );
    mockLoadBookingsByDayRepository.loadBookingsByDay.mockResolvedValueOnce([
      {
        startTime: timeToDateConverter('02:00:00'),
        endTime: timeToDateConverter('03:00:00'),
      },
      {
        startTime: timeToDateConverter('07:00:00'),
        endTime: timeToDateConverter('08:00:00'),
      },
      {
        startTime: timeToDateConverter('05:00:00'),
        endTime: timeToDateConverter('05:30:00'),
      },
    ]);

    result = await addBook.add('userId', 'spaceId', {
      day: new Date('2024-02-04'),
      startTime: timeToDateConverter('04:00:00'),
      endTime: timeToDateConverter('06:00:00'),
    });

    expect(result).toBeNull();
  });

  test('It should return null if adding the booking fails', async () => {
    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      true,
    );
    mockLoadSpaceAvailabilityRepository.loadSpaceAvailability.mockResolvedValueOnce(
      [],
    );
    mockLoadBookingsByDayRepository.loadBookingsByDay.mockResolvedValueOnce([]);
    mockAddBookingRepository.addBooking.mockResolvedValueOnce(null);

    const result = await addBook.add('userId', 'spaceId', {
      day: new Date('2024-02-04'),
      startTime: timeToDateConverter('04:00:00'),
      endTime: timeToDateConverter('06:00:00'),
    });

    expect(result).toBeNull();
  });

  test('It should call addBooking with correct parameters and return the booking', async () => {
    const mockBooking = {
      id: 'bookingId',
      day: new Date('2024-02-04'),
      startTime: timeToDateConverter('04:00:00'),
      endTime: timeToDateConverter('06:00:00'),
    };

    mockCheckUserSpaceAccessRepository.verifyUserAccess.mockResolvedValueOnce(
      true,
    );
    mockLoadSpaceAvailabilityRepository.loadSpaceAvailability.mockResolvedValueOnce(
      [],
    );
    mockLoadBookingsByDayRepository.loadBookingsByDay.mockResolvedValueOnce([]);
    mockAddBookingRepository.addBooking.mockResolvedValueOnce(mockBooking);

    const result = await addBook.add('userId', 'spaceId', {
      day: new Date('2024-02-04'),
      startTime: timeToDateConverter('04:00:00'),
      endTime: timeToDateConverter('06:00:00'),
    });

    expect(result).toEqual(mockBooking);
  });
});
