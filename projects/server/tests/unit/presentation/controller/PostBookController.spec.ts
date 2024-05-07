import PostBookController from '@/presentation/controllers/PostBookController';

const mockAddBook = {
  add: jest.fn(),
};

describe('PostBookController', () => {
  let postBookController: PostBookController;

  beforeEach(() => {
    postBookController = new PostBookController(mockAddBook);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should return 400 if request params are invalid', async () => {
    let request = {};
    let result = await postBookController.handle(request);
    expect(result.status).toBe(400);

    request = { params: {} };
    result = await postBookController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { spaceId: '' } };
    result = await postBookController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 400 if request body are invalid', async () => {
    let request = {
      params: { spaceId: 'spaceId' },
      body: {},
    };
    let result = await postBookController.handle(request);
    expect(result.status).toBe(400);

    request = {
      params: { spaceId: 'spaceId' },
      body: { day: '', startTime: '', endTime: '' },
    };
    result = await postBookController.handle(request);
    expect(result.status).toBe(400);

    request = {
      params: { spaceId: 'spaceId' },
      body: { day: '2020-01-32', startTime: '00:00', endTime: '01:00' },
    };
    result = await postBookController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 400 if startTime is greater than endTime', async () => {
    const request = {
      params: { spaceId: 'spaceId' },
      body: { day: '2024-05-06', startTime: '20:00:00', endTime: '01:00:00' },
    };
    const result = await postBookController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 403 if addBook operation fails', async () => {
    const request = {
      params: { spaceId: 'spaceId' },
      body: { day: '2024-05-06', startTime: '01:00:00', endTime: '20:00:00' },
      account: { id: 'userId' },
    };

    mockAddBook.add.mockResolvedValueOnce(null);

    const result = await postBookController.handle(request);
    expect(result.status).toBe(403);
  });

  test('should call addBook with correct parameters and return 201 response', async () => {
    const request = {
      params: { spaceId: 'spaceId' },
      body: { day: '2024-05-06', startTime: '01:00:00', endTime: '20:00:00' },
      account: { id: 'userId' },
    };

    const booking = {
      id: 'bookingId',
      day: '2024-05-06',
      startTime: '01:00:00',
      endTime: '20:00:00',
    };

    mockAddBook.add.mockResolvedValueOnce(booking);

    const result = await postBookController.handle(request);
    expect(result).toEqual({ status: 201, body: booking });
  });
});
