import GetSpaceBookingsController from '@/presentation/controllers/GetSpaceBookingsController';

const mockLoadSpaceBookings = {
  load: jest.fn(),
};

describe('GetSpaceBookingsController', () => {
  let getSpaceBookingsController: GetSpaceBookingsController;

  beforeEach(() => {
    getSpaceBookingsController = new GetSpaceBookingsController(
      mockLoadSpaceBookings,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should return 400 if request params are invalid', async () => {
    let request = {};
    let result = await getSpaceBookingsController.handle(request);
    expect(result.status).toBe(400);

    request = { params: {} };
    result = await getSpaceBookingsController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { spaceId: '' } };
    result = await getSpaceBookingsController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { spaceId: '', day: '' } };
    result = await getSpaceBookingsController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 403 if bookings cannot be loaded', async () => {
    const request = {
      params: { spaceId: 'spaceId', day: '2024-02-05' },
      account: { id: 'userId' },
    };

    mockLoadSpaceBookings.load.mockResolvedValueOnce(null);

    const result = await getSpaceBookingsController.handle(request);
    expect(result.status).toBe(403);
  });

  test('It should return bookings if successfully loaded', async () => {
    const request = {
      params: { spaceId: 'spaceId', day: '2024-02-05' },
      account: { id: 'userId' },
    };

    const mockBookings = [
      {
        id: 'bookingId',
        startTime: '01:00:00',
        endTime: '02:00:00',
        userId: 'userId',
      },
      {
        id: 'bookingId',
        startTime: '03:00:00',
        endTime: '04:00:00',
        userId: 'userId',
      },
    ];

    mockLoadSpaceBookings.load.mockResolvedValueOnce(mockBookings);

    const result = await getSpaceBookingsController.handle(request);
    expect(result).toEqual({ status: 200, body: mockBookings });
  });
});
