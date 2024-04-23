import DeleteWorkspaceResourceController from '@/presentation/controllers/DeleteWorkspaceResourceController';

const mockDeleteWorkspaceResource = {
  delete: jest.fn(),
};

describe('DeleteWorkspaceResourceController', () => {
  let deleteWorkspaceResourceController: DeleteWorkspaceResourceController;

  beforeEach(() => {
    deleteWorkspaceResourceController = new DeleteWorkspaceResourceController(
      mockDeleteWorkspaceResource,
    );
  });

  test('It should return 400 if request params are invalid', async () => {
    let request = {};
    let result = await deleteWorkspaceResourceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: {} };
    result = await deleteWorkspaceResourceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { workspaceId: 'workspaceId' } };
    result = await deleteWorkspaceResourceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { resourceId: 'resourceId' } };
    result = await deleteWorkspaceResourceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { workspaceId: '', resourceId: '' } };
    result = await deleteWorkspaceResourceController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 403 if deleting the workspace resource fails', async () => {
    const request = {
      params: { workspaceId: 'workspaceId', resourceId: 'resourceId' },
      account: { id: 'authUserId' },
    };

    mockDeleteWorkspaceResource.delete.mockResolvedValue(false);

    const result = await deleteWorkspaceResourceController.handle(request);
    expect(result.status).toBe(403);
  });

  test('It should return 200 if delete workspace resource operation is successful', async () => {
    const request = {
      params: { workspaceId: 'workspaceId', resourceId: 'resourceId' },
      account: { id: 'authUserId' },
    };

    mockDeleteWorkspaceResource.delete.mockResolvedValue(true);

    const result = await deleteWorkspaceResourceController.handle(request);
    expect(result.status).toBe(200);
  });
});
