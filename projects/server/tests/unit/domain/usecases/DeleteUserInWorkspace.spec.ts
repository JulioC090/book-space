import { User } from '@/domain/models/User';
import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import DeleteUserInWorkspace from '@/domain/usecases/DeleteUserInWorkspace';

const mockLoadUserRoleRepository = {
  loadUserRole: jest.fn(),
};

const mockLoadWorkspaceByIdRepository = {
  loadById: jest.fn(),
};

const mockLoadAccountByEmailRepository = {
  loadByEmail: jest.fn(),
};

const mockDeleteUserInWorkspaceRepository = {
  deleteUserInWorkspace: jest.fn(),
};

describe('DeleteUserInWorkspace', () => {
  let deleteUserInWorkspace: DeleteUserInWorkspace;

  beforeEach(() => {
    deleteUserInWorkspace = new DeleteUserInWorkspace(
      mockLoadUserRoleRepository,
      mockLoadWorkspaceByIdRepository,
      mockLoadAccountByEmailRepository,
      mockDeleteUserInWorkspaceRepository,
    );
  });

  test('It should delete user in workspace successfully', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const userEmail = 'user@example.com';

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole
      .mockResolvedValueOnce(WorkspaceRoles.MANAGER)
      .mockResolvedValueOnce(WorkspaceRoles.DEFAULT);
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User Name',
      email: userEmail,
    });
    mockDeleteUserInWorkspaceRepository.deleteUserInWorkspace.mockResolvedValue(
      true,
    );

    const result = await deleteUserInWorkspace.deleteUserInWorkspace(
      authenticatedUser,
      workspaceId,
      userEmail,
    );

    expect(result).toBeTruthy();
  });

  test('It should return false if workspace is not found', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const userEmail = 'user@example.com';

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue(null);

    const result = await deleteUserInWorkspace.deleteUserInWorkspace(
      authenticatedUser,
      workspaceId,
      userEmail,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false when the authenticated user role is null', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const userEmail = 'user@example.com';

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(null);

    const result = await deleteUserInWorkspace.deleteUserInWorkspace(
      authenticatedUser,
      workspaceId,
      userEmail,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false when the authenticated user does not have the REMOVE_USER_FROM_WORKSPACE permission', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const userEmail = 'user@example.com';

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.DEFAULT,
    );

    const result = await deleteUserInWorkspace.deleteUserInWorkspace(
      authenticatedUser,
      workspaceId,
      userEmail,
    );

    expect(result).toBeFalsy();
  });

  test('It should return null if user cannot be found by email', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const userEmail = 'user@example.com';

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole
      .mockResolvedValueOnce(WorkspaceRoles.MANAGER)
      .mockResolvedValueOnce(WorkspaceRoles.DEFAULT);
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue(null);

    const result = await deleteUserInWorkspace.deleteUserInWorkspace(
      authenticatedUser,
      workspaceId,
      userEmail,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false if the user is not in the workspace', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const userEmail = 'user@example.com';

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole
      .mockResolvedValueOnce(WorkspaceRoles.MANAGER)
      .mockResolvedValueOnce(null);
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User Name',
      email: userEmail,
    });

    const result = await deleteUserInWorkspace.deleteUserInWorkspace(
      authenticatedUser,
      workspaceId,
      userEmail,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false when the authenticated user tries to delete a user with a higher role than him', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const userEmail = 'user@example.com';

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole
      .mockResolvedValueOnce(WorkspaceRoles.MANAGER)
      .mockResolvedValueOnce(WorkspaceRoles.MANAGER);
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User Name',
      email: userEmail,
    });

    const result = await deleteUserInWorkspace.deleteUserInWorkspace(
      authenticatedUser,
      workspaceId,
      userEmail,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false if user deletion fails', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const userEmail = 'user@example.com';

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole
      .mockResolvedValueOnce(WorkspaceRoles.MANAGER)
      .mockResolvedValueOnce(WorkspaceRoles.DEFAULT);
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User Name',
      email: userEmail,
    });
    mockDeleteUserInWorkspaceRepository.deleteUserInWorkspace.mockResolvedValue(
      false,
    );

    const result = await deleteUserInWorkspace.deleteUserInWorkspace(
      authenticatedUser,
      workspaceId,
      userEmail,
    );

    expect(result).toBeFalsy();
  });
});
