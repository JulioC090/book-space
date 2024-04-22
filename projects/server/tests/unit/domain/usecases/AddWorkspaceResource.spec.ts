import Resource from '@/domain/models/Resource';
import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import AddWorkspaceResource from '@/domain/usecases/AddWorkspaceResource';

const mockLoadUserRoleRepository = {
  loadUserRole: jest.fn(),
};

const mockCheckResourceNameRepository = {
  checkName: jest.fn(),
};

const mockAddWorkspaceResourceRepository = {
  add: jest.fn(),
};

describe('AddWorkspaceResource', () => {
  let addWorkspaceResource: AddWorkspaceResource;

  beforeEach(() => {
    addWorkspaceResource = new AddWorkspaceResource(
      mockLoadUserRoleRepository,
      mockCheckResourceNameRepository,
      mockAddWorkspaceResourceRepository,
    );
  });

  test('It should add resource to workspace successfully', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const resource: Omit<Resource, 'id'> = { name: 'resourceName' };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );
    mockCheckResourceNameRepository.checkName.mockResolvedValue(false);
    mockAddWorkspaceResourceRepository.add.mockResolvedValue({
      id: 'resourceId',
      ...resource,
    });

    const result = await addWorkspaceResource.add(
      authUserId,
      workspaceId,
      resource,
    );
    expect(result).toEqual({ id: 'resourceId', ...resource });
  });

  test('It should return null when the authenticated user role is null', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const resource: Omit<Resource, 'id'> = { name: 'resourceName' };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(null);

    const result = await addWorkspaceResource.add(
      authUserId,
      workspaceId,
      resource,
    );
    expect(result).toBeNull();
  });

  test('It should return null when the authenticated user does not have the ADD_SPACE_TO_WORKSPACE permission', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const resource: Omit<Resource, 'id'> = { name: 'resourceName' };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.DEFAULT,
    );

    const result = await addWorkspaceResource.add(
      authUserId,
      workspaceId,
      resource,
    );
    expect(result).toBeNull();
  });

  test('It should return null when resource name already exists in the workspace', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const resource: Omit<Resource, 'id'> = { name: 'resourceName' };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );
    mockCheckResourceNameRepository.checkName.mockResolvedValue(true);

    const result = await addWorkspaceResource.add(
      authUserId,
      workspaceId,
      resource,
    );
    expect(result).toBeNull();
  });

  test('It should return null if the resource cannot be added', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const resource: Omit<Resource, 'id'> = { name: 'resourceName' };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );
    mockCheckResourceNameRepository.checkName.mockResolvedValue(false);
    mockAddWorkspaceResourceRepository.add.mockResolvedValue(null);

    const result = await addWorkspaceResource.add(
      authUserId,
      workspaceId,
      resource,
    );
    expect(result).toBeNull();
  });
});
