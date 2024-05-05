import PatchSpaceController from '@/presentation/controllers/PatchSpaceController';
import timeToDateConverter from '@/presentation/helpers/timeToDateConverter';

const mockUpdateSpace = {
  update: jest.fn(),
};

describe('PatchSpaceController', () => {
  let patchSpaceController: PatchSpaceController;

  beforeEach(() => {
    patchSpaceController = new PatchSpaceController(mockUpdateSpace);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should return 400 if request params are invalid', async () => {
    let request = {};
    let result = await patchSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: {} };
    result = await patchSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { workspaceId: 'workspaceId' } };
    result = await patchSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { spaceId: 'spaceId' } };
    result = await patchSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { workspaceId: '', spaceId: '' } };
    result = await patchSpaceController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 400 if request body is invalid', async () => {
    let request = {
      params: { workspaceId: 'workspaceId', spaceId: 'spaceId' },
      body: {},
    };
    let result = await patchSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = {
      params: { workspaceId: 'workspaceId', spaceId: 'spaceId' },
      body: { name: 'n', description: 'd' },
    };
    result = await patchSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = {
      params: { workspaceId: 'workspaceId', spaceId: 'spaceId' },
      body: { maxAmountOfPeople: -1 },
    };
    result = await patchSpaceController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 400 if availability range is invalid', async () => {
    const request = {
      params: { workspaceId: 'workspaceId', spaceId: 'spaceId' },
      body: {
        name: 'SpaceName',
        description: 'SpaceDescription',
        availabilityRange: [
          { weekday: 1, startTime: '12:00:00', endTime: '08:00:00' },
        ],
      },
    };
    const result = await patchSpaceController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 403 if updateSpace operation fails', async () => {
    const request = {
      params: { workspaceId: 'workspaceId', spaceId: 'spaceId' },
      body: { name: 'newName' },
      account: { id: 'userId' },
    };

    mockUpdateSpace.update.mockResolvedValue(false);

    const result = await patchSpaceController.handle(request);

    expect(mockUpdateSpace.update).toHaveBeenCalledWith(
      'userId',
      'workspaceId',
      'spaceId',
      { name: 'newName' },
      undefined,
    );
    expect(result.status).toBe(403);
  });

  test('It should return 200 if updateSpace operation succeeds', async () => {
    const request = {
      params: { workspaceId: 'workspaceId', spaceId: 'spaceId' },
      body: {
        name: 'newName',
        availabilityRange: [
          { weekday: 1, startTime: '08:00:00', endTime: '12:00:00' },
        ],
      },
      account: { id: 'userId' },
    };

    mockUpdateSpace.update.mockResolvedValueOnce(true);

    const result = await patchSpaceController.handle(request);

    expect(mockUpdateSpace.update).toHaveBeenCalledWith(
      'userId',
      'workspaceId',
      'spaceId',
      {
        name: 'newName',
        availabilityRange: [
          {
            weekday: 1,
            startTime: timeToDateConverter('08:00:00'),
            endTime: timeToDateConverter('12:00:00'),
          },
        ],
      },
      undefined,
    );
    expect(result.status).toBe(200);
  });
});
