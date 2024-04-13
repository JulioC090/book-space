import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import UpdateWorkspace from '@/domain/usecases/UpdateWorkspace';

const mockLoadUserRoleRepository = {
  loadUserRole: jest.fn(),
};

const mockUpdateWorkspaceRepository = {
  update: jest.fn(),
};

describe('UpdateWorkspace', () => {
  let updateWorkspace: UpdateWorkspace;

  beforeEach(() => {
    updateWorkspace = new UpdateWorkspace(
      mockLoadUserRoleRepository,
      mockUpdateWorkspaceRepository,
    );
  });

  test('It should update workspace successfully', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const partialWorkspace = { name: 'New Workspace Name' };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.OWNER,
    );
    mockUpdateWorkspaceRepository.update.mockResolvedValue(true);

    const result = await updateWorkspace.update(
      authenticatedUserId,
      workspaceId,
      partialWorkspace,
    );

    expect(result).toBeTruthy();
  });

  test('It should return false when the authenticated user role is null', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const partialWorkspace = { name: 'New Workspace Name' };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(null);

    const result = await updateWorkspace.update(
      authenticatedUserId,
      workspaceId,
      partialWorkspace,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false when the authenticated user does not have the UPDATE_WORKSPACE permission', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const partialWorkspace = { name: 'New Workspace Name' };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.DEFAULT,
    );

    const result = await updateWorkspace.update(
      authenticatedUserId,
      workspaceId,
      partialWorkspace,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false if failed to update workspace', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const partialWorkspace = { name: 'New Workspace Name' };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.OWNER,
    );
    mockUpdateWorkspaceRepository.update.mockResolvedValue(false);

    const result = await updateWorkspace.update(
      authenticatedUserId,
      workspaceId,
      partialWorkspace,
    );

    expect(result).toBeFalsy();
  });
});
