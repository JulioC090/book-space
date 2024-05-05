import PostSpaceController from '@/presentation/controllers/PostSpaceController';

const mockAddSpace = {
  add: jest.fn(),
};
describe('PostSpaceController', () => {
  let postSpaceController: PostSpaceController;

  beforeEach(() => {
    postSpaceController = new PostSpaceController(mockAddSpace);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should return 400 if request params are invalid', async () => {
    let request = {};
    let result = await postSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: {} };
    result = await postSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { workspaceId: 'workspaceId' } };
    result = await postSpaceController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 400 if request body is invalid', async () => {
    let request = {
      params: { workspaceId: 'workspaceId' },
      body: {},
    };
    let result = await postSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = {
      params: { workspaceId: 'workspaceId' },
      body: {
        name: '',
        description: '',
        maxAmountOfPeople: -1,
      },
    };

    result = await postSpaceController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 400 if availability range is invalid', async () => {
    const request = {
      params: {
        workspaceId: 'workspaceId',
      },
      body: {
        name: 'SpaceName',
        description: 'SpaceDescription',
        availabilityRange: [
          { weekday: 1, startTime: '12:00:00', endTime: '08:00:00' },
        ],
      },
    };

    const result = await postSpaceController.handle(request);

    expect(result).toEqual({
      status: 400,
      body: { error: 'Invalid time range' },
    });
  });

  test('It should return 403 if addSpace operation fails', async () => {
    const request = {
      params: {
        workspaceId: 'workspaceId',
      },
      body: {
        name: 'SpaceName',
        description: 'SpaceDescription',
        availabilityRange: [
          { weekday: 1, startTime: '08:00:00', endTime: '12:00:00' },
        ],
      },
    };

    mockAddSpace.add.mockResolvedValueOnce(null);

    const result = await postSpaceController.handle(request);

    expect(result.status).toBe(403);
  });

  test('It should return 201 if addSpace operation succeeds', async () => {
    const space = {
      name: 'SpaceName',
      description: 'SpaceDescription',
      workspaceId: 'workspaceId',
    };

    const request = {
      params: {
        workspaceId: 'workspaceId',
      },
      body: space,
    };

    mockAddSpace.add.mockResolvedValueOnce({
      id: 'spaceId',
      maxAmountOfPeople: null,
      ...space,
    });

    const result = await postSpaceController.handle(request);

    expect(result).toEqual({
      status: 201,
      body: { id: 'spaceId', maxAmountOfPeople: null, ...space },
    });
  });
});
