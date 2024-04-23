import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import IDeleteWorkspaceResource from '@/domain/protocols/usecases/IDeleteWorkspaceResource';
import DeleteWorkspaceResource from '@/domain/usecases/DeleteWorkspaceResource';

const mockLoadUserRoleRepository = {
  loadUserRole: jest.fn(),
};

const mockDeleteWorkspaceResourceRepository = {
  delete: jest.fn(),
};

describe('DeleteWorkspaceResource', () => {
  let deleteWorkspaceResource: IDeleteWorkspaceResource;

  beforeEach(() => {
    deleteWorkspaceResource = new DeleteWorkspaceResource(
      mockLoadUserRoleRepository,
      mockDeleteWorkspaceResourceRepository,
    );
  });

  test('It should delete the workspace resource successfully', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const resourceId = 'resourceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );

    mockDeleteWorkspaceResourceRepository.delete.mockResolvedValue(true);

    const result = await deleteWorkspaceResource.delete(
      authUserId,
      workspaceId,
      resourceId,
    );
    expect(result).toBeTruthy();
  });

  test('It should return false when the authenticated user role is null', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const resourceId = 'resourceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(null);

    const result = await deleteWorkspaceResource.delete(
      authUserId,
      workspaceId,
      resourceId,
    );
    expect(result).toBeFalsy();
  });

  test('It should return false when the authenticated user does not have the ADD_SPACE_TO_WORKSPACE permission', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const resourceId = 'resourceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.DEFAULT,
    );

    const result = await deleteWorkspaceResource.delete(
      authUserId,
      workspaceId,
      resourceId,
    );
    expect(result).toBeFalsy();
  });

  test('It should return false if the resource cannot be deleted', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const resourceId = 'resourceId';

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );
    mockDeleteWorkspaceResourceRepository.delete.mockResolvedValue(false);

    const result = await deleteWorkspaceResource.delete(
      authUserId,
      workspaceId,
      resourceId,
    );
    expect(result).toBeFalsy();
  });
});
