import PostWorkspaceResourceController from '@/presentation/controllers/PostWorkspaceResourceController';

const mockAddWorkspaceResource = {
  add: jest.fn(),
};

describe('PostWorkspaceResourceController', () => {
  let postWorkspaceResourceController: PostWorkspaceResourceController;

  beforeEach(() => {
    postWorkspaceResourceController = new PostWorkspaceResourceController(
      mockAddWorkspaceResource,
    );
  });

  test('It should return 400 if request params are invalid', async () => {
    let request = {};
    let result = await postWorkspaceResourceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: {} };
    result = await postWorkspaceResourceController.handle(request);
    expect(result.status).toBe(400);

    request = { params: { workspaceId: 'workspaceId' } };
    result = await postWorkspaceResourceController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 400 if request body is invalid', async () => {
    let request = {
      params: { workspaceId: 'workspaceId' },
      body: {},
    };
    let result = await postWorkspaceResourceController.handle(request);
    expect(result.status).toBe(400);

    request = {
      params: { workspaceId: 'workspaceId' },
      body: { name: '' },
    };
    result = await postWorkspaceResourceController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 403 if add workspace resource fails', async () => {
    const request = {
      params: { workspaceId: 'workspaceId' },
      body: { name: 'resourceName' },
      account: { id: 'authUserId' },
    };

    mockAddWorkspaceResource.add.mockResolvedValue(null);

    const result = await postWorkspaceResourceController.handle(request);
    expect(result.status).toBe(403);
  });

  test('It should return 201 if the add workspace resource operation is successful', async () => {
    const request = {
      params: { workspaceId: 'workspaceId' },
      body: { name: 'resourceName' },
      account: { id: 'authUserId' },
    };

    const resource = { id: 'resourceId', name: 'resourceName' };

    mockAddWorkspaceResource.add.mockResolvedValue({ ...resource });

    const result = await postWorkspaceResourceController.handle(request);
    expect(result.status).toBe(201);
    expect(result.body).toEqual({ ...resource });
  });
});
