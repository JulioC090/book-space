import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import DeleteSpace from '@/domain/usecases/DeleteSpace';

const mockLoadUserRoleRepository = {
  loadUserRole: jest.fn(),
};

const mockCheckSpaceIsInWorkspaceRepository = {
  isInWorkspace: jest.fn(),
};

const mockDeleteSpaceRepository = {
  delete: jest.fn(),
};

describe('DeleteSpace', () => {
  let deleteSpace: DeleteSpace;

  beforeEach(() => {
    deleteSpace = new DeleteSpace(
      mockLoadUserRoleRepository,
      mockCheckSpaceIsInWorkspaceRepository,
      mockDeleteSpaceRepository,
    );
  });

  test('It should delete space successfully', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const spaceId = 'spaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );

    mockCheckSpaceIsInWorkspaceRepository.isInWorkspace.mockResolvedValue(true);

    mockDeleteSpaceRepository.delete.mockResolvedValue(true);

    const result = await deleteSpace.delete(
      authenticatedUserId,
      workspaceId,
      spaceId,
    );
    expect(result).toBeTruthy();
  });

  test('It should return false when the authenticated user role is null', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const spaceId = 'spaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(null);

    const result = await deleteSpace.delete(
      authenticatedUserId,
      workspaceId,
      spaceId,
    );
    expect(result).toBeFalsy();
  });

  test('It should return false when the authenticated user does not have the DELETE_SPACE_FROM_WORKSPACE permission', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const spaceId = 'spaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.DEFAULT,
    );

    const result = await deleteSpace.delete(
      authenticatedUserId,
      workspaceId,
      spaceId,
    );
    expect(result).toBeFalsy();
  });

  test('It should return false when the space is not in the workspace', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const spaceId = 'spaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );

    mockCheckSpaceIsInWorkspaceRepository.isInWorkspace.mockResolvedValue(
      false,
    );

    const result = await deleteSpace.delete(
      authenticatedUserId,
      workspaceId,
      spaceId,
    );
    expect(result).toBeFalsy();
  });

  test('It should return false when space is not found', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const spaceId = 'spaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );

    mockCheckSpaceIsInWorkspaceRepository.isInWorkspace.mockResolvedValue(true);

    mockDeleteSpaceRepository.delete.mockResolvedValue(false);

    const result = await deleteSpace.delete(
      authenticatedUserId,
      workspaceId,
      spaceId,
    );
    expect(result).toBeFalsy();
  });
});
