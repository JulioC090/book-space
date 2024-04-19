import DeleteSpaceController from '@/presentation/controllers/DeleteSpaceController';

const mockDeleteSpace = {
  delete: jest.fn(),
};

describe('DeleteSpaceController', () => {
  let deleteSpaceController: DeleteSpaceController;

  beforeEach(() => {
    deleteSpaceController = new DeleteSpaceController(mockDeleteSpace);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should return 400 if request params are invalid', async () => {
    let request = {};
    let result = await deleteSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: {} };
    result = await deleteSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { workspaceId: 'workspaceId' } };
    result = await deleteSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { spaceId: 'workspaceId' } };
    result = await deleteSpaceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { workspaceId: '', spaceId: '' } };
    result = await deleteSpaceController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 403 if deleteSpace operation fails', async () => {
    const request = {
      params: { workspaceId: 'workspaceId', spaceId: 'spaceId' },
      account: { id: 'userId' },
    };

    mockDeleteSpace.delete.mockResolvedValueOnce(false);

    const result = await deleteSpaceController.handle(request);

    expect(mockDeleteSpace.delete).toHaveBeenCalledWith(
      'userId',
      'workspaceId',
      'spaceId',
    );
    expect(result.status).toBe(403);
  });

  test('It should return 200 if deleteSpace operation succeeds', async () => {
    const request = {
      params: { workspaceId: 'workspaceId', spaceId: 'spaceId' },
      account: { id: 'userId' },
    };

    mockDeleteSpace.delete.mockResolvedValueOnce(true);

    const result = await deleteSpaceController.handle(request);

    expect(mockDeleteSpace.delete).toHaveBeenCalledWith(
      'userId',
      'workspaceId',
      'spaceId',
    );
    expect(result.status).toBe(200);
  });
});
