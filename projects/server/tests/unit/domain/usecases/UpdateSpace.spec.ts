import Space from '@/domain/models/Space';
import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import IUpdateSpace from '@/domain/protocols/usecases/IUpdateSpace';
import UpdateSpace from '@/domain/usecases/UpdateSpace';

const mockLoadUserRoleRepository = {
  loadUserRole: jest.fn(),
};

const mockCheckSpaceIsInWorkspaceRepository = {
  isInWorkspace: jest.fn(),
};

const mockUpdateSpaceRepository = {
  update: jest.fn(),
};

describe('UpdateSpace', () => {
  let updateSpace: IUpdateSpace;

  beforeEach(() => {
    updateSpace = new UpdateSpace(
      mockLoadUserRoleRepository,
      mockCheckSpaceIsInWorkspaceRepository,
      mockUpdateSpaceRepository,
    );
  });

  test('It should update space successfully', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const spaceId = 'spaceId';
    const partialSpace: Partial<Space> = {
      name: 'newName',
    };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );

    mockCheckSpaceIsInWorkspaceRepository.isInWorkspace.mockResolvedValue(true);

    mockUpdateSpaceRepository.update.mockResolvedValue(true);

    const result = await updateSpace.update(
      authUserId,
      workspaceId,
      spaceId,
      partialSpace,
    );
    expect(result).toBeTruthy();
  });

  test('It should return false when the authenticated user role is null', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const spaceId = 'spaceId';
    const partialSpace: Partial<Space> = {
      name: 'newName',
      maxAmountOfPeople: null,
    };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(null);

    const result = await updateSpace.update(
      authUserId,
      workspaceId,
      spaceId,
      partialSpace,
    );
    expect(result).toBeFalsy();
  });

  test('It should return false when the authenticated user does not have the UPDATE_SPACE permission', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const spaceId = 'spaceId';
    const partialSpace: Partial<Space> = {
      name: 'newName',
    };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.DEFAULT,
    );

    const result = await updateSpace.update(
      authUserId,
      workspaceId,
      spaceId,
      partialSpace,
    );
    expect(result).toBeFalsy();
  });

  test('It should return false when the space is not in the workspace', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const spaceId = 'spaceId';
    const partialSpace: Partial<Space> = {
      name: 'newName',
    };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );

    mockCheckSpaceIsInWorkspaceRepository.isInWorkspace.mockResolvedValue(
      false,
    );

    const result = await updateSpace.update(
      authUserId,
      workspaceId,
      spaceId,
      partialSpace,
    );
    expect(result).toBeFalsy();
  });

  test('It should return false if failed to update space', async () => {
    const authUserId = 'authUserId';
    const workspaceId = 'workspaceId';
    const spaceId = 'spaceId';
    const partialSpace: Partial<Space> = {
      name: 'newName',
    };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );

    mockCheckSpaceIsInWorkspaceRepository.isInWorkspace.mockResolvedValue(true);

    mockUpdateSpaceRepository.update.mockResolvedValue(false);

    const result = await updateSpace.update(
      authUserId,
      workspaceId,
      spaceId,
      partialSpace,
    );
    expect(result).toBeFalsy();
  });
});
