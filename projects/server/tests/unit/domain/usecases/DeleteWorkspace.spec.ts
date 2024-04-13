import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import DeleteWorkspace from '@/domain/usecases/DeleteWorkspace';

const mockLoadUserRoleRepository = {
  loadUserRole: jest.fn(),
};

const mockDeleteWorkspaceRepository = {
  delete: jest.fn(),
};

describe('DeleteWorkspace', () => {
  let deleteWorkspace: DeleteWorkspace;

  beforeEach(() => {
    deleteWorkspace = new DeleteWorkspace(
      mockLoadUserRoleRepository,
      mockDeleteWorkspaceRepository,
    );
  });

  test('It should delete workspace successfully', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.OWNER,
    );
    mockDeleteWorkspaceRepository.delete.mockResolvedValue(true);

    const result = await deleteWorkspace.delete(
      authenticatedUserId,
      workspaceId,
    );

    expect(result).toBeTruthy();
  });

  test('It should return false when the authenticated user role is null', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(null);

    const result = await deleteWorkspace.delete(
      authenticatedUserId,
      workspaceId,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false when the authenticated user does not have the DELETE_WORKSPACE permission', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.DEFAULT,
    );

    const result = await deleteWorkspace.delete(
      authenticatedUserId,
      workspaceId,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false if failed to delete workspace', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.OWNER,
    );
    mockDeleteWorkspaceRepository.delete.mockResolvedValue(false);

    const result = await deleteWorkspace.delete(
      authenticatedUserId,
      workspaceId,
    );

    expect(result).toBeFalsy();
  });
});
