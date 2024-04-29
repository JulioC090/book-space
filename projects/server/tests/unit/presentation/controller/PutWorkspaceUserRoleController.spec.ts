import PutWorkspaceUserRoleController from '@/presentation/controllers/PutWorkspaceUserRoleController';

const mockUpdateWorkspaceUserRole = {
  updateUserRole: jest.fn(),
};

describe('PutWorkspaceUserRoleController', () => {
  let putWorkspaceUserRoleController: PutWorkspaceUserRoleController;

  beforeEach(() => {
    putWorkspaceUserRoleController = new PutWorkspaceUserRoleController(
      mockUpdateWorkspaceUserRole,
    );
  });

  test('It should return 400 if request params are invalid', async () => {
    let request = {};
    let result = await putWorkspaceUserRoleController.handle(request);
    expect(result.status).toBe(400);

    request = { params: {} };
    result = await putWorkspaceUserRoleController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 400 if request body is invalid', async () => {
    let request = { params: { workspaceId: 'workspaceId' }, body: {} };
    let result = await putWorkspaceUserRoleController.handle(request);
    expect(result.status).toBe(400);

    request = {
      params: { workspaceId: 'workspaceId' },
      body: { userEmail: '', role: '' },
    };
    result = await putWorkspaceUserRoleController.handle(request);
    expect(result.status).toBe(400);

    request = {
      params: { workspaceId: 'workspaceId' },
      body: { userEmail: 'user_email', role: '' },
    };
    result = await putWorkspaceUserRoleController.handle(request);
    expect(result.status).toBe(400);

    request = {
      params: { workspaceId: 'workspaceId' },
      body: { userEmail: 'user_email', role: 'invalid_role' },
    };
    result = await putWorkspaceUserRoleController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 403 if UpdateWorkspaceUserRole returns false', async () => {
    const request = {
      params: { workspaceId: 'workspaceId' },
      body: { userEmail: 'user_email', role: 'DEFAULT' },
    };

    mockUpdateWorkspaceUserRole.updateUserRole.mockResolvedValueOnce(false);

    const result = await putWorkspaceUserRoleController.handle(request);
    expect(result.status).toBe(403);
  });

  test('It should return 200 on success', async () => {
    const request = {
      params: { workspaceId: 'workspaceId' },
      body: { userEmail: 'user_email', role: 'DEFAULT' },
    };

    mockUpdateWorkspaceUserRole.updateUserRole.mockResolvedValueOnce(true);

    const result = await putWorkspaceUserRoleController.handle(request);
    expect(result.status).toBe(200);
  });
});
