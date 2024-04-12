import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import LeaveWorkspace from '@/domain/usecases/LeaveWorkspace';

const mockLoadUserRoleRepository = {
  loadUserRole: jest.fn(),
};

const mockDeleteUserInWorkspaceRepository = {
  deleteUserInWorkspace: jest.fn(),
};

describe('LeaveWorkspace', () => {
  let leaveWorkspace: LeaveWorkspace;

  beforeEach(() => {
    leaveWorkspace = new LeaveWorkspace(
      mockLoadUserRoleRepository,
      mockDeleteUserInWorkspaceRepository,
    );
  });

  test('It should leave workspace successfully', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.DEFAULT,
    );
    mockDeleteUserInWorkspaceRepository.deleteUserInWorkspace.mockResolvedValue(
      true,
    );

    const result = await leaveWorkspace.leave(authenticatedUserId, workspaceId);

    expect(result).toBeTruthy();
  });

  test('It should return false when the authenticated user role is null', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(null);

    const result = await leaveWorkspace.leave(authenticatedUserId, workspaceId);

    expect(result).toBeFalsy();
  });

  test('It should return false if user role does not have permission to leave workspace', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.OWNER,
    );
    mockDeleteUserInWorkspaceRepository.deleteUserInWorkspace.mockResolvedValue(
      true,
    );

    const result = await leaveWorkspace.leave(authenticatedUserId, workspaceId);

    expect(result).toBeFalsy();
  });

  test('It should return false if failed to remove user from workspace', async () => {
    const authenticatedUserId = 'authUserId';
    const workspaceId = 'workspaceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.DEFAULT,
    );
    mockDeleteUserInWorkspaceRepository.deleteUserInWorkspace.mockResolvedValue(
      false,
    );

    const result = await leaveWorkspace.leave(authenticatedUserId, workspaceId);

    expect(result).toBeFalsy();
  });
});
