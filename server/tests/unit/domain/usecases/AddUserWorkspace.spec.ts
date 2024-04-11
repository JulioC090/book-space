import { User } from '@/domain/models/User';
import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import AddUserToWorkspace from '@/domain/usecases/AddUserToWorkspace';

const mockLoadUserRoleRepository = {
  loadUserRole: jest.fn(),
};

const mockLoadWorkspaceByIdRepository = {
  loadById: jest.fn(),
};

const mockLoadAccountByEmailRepository = {
  loadByEmail: jest.fn(),
};

const mockCheckUserExistInWorkspaceRepository = {
  checkUserInWorkspace: jest.fn(),
};

const mockAddUserToWorkspaceRepository = {
  addUserToWorkspace: jest.fn(),
};

describe('AddUserWorkspace', () => {
  let addUserToWorkspace: AddUserToWorkspace;

  beforeEach(() => {
    addUserToWorkspace = new AddUserToWorkspace(
      mockLoadUserRoleRepository,
      mockLoadWorkspaceByIdRepository,
      mockLoadAccountByEmailRepository,
      mockCheckUserExistInWorkspaceRepository,
      mockAddUserToWorkspaceRepository,
    );
  });

  test('It should add user to workspace successfully', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.DEFAULT };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User Name',
      email: user.email,
    });
    mockCheckUserExistInWorkspaceRepository.checkUserInWorkspace.mockResolvedValue(
      false,
    );
    mockAddUserToWorkspaceRepository.addUserToWorkspace.mockResolvedValue(true);

    const result = await addUserToWorkspace.addUserToWorkspace(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toEqual({
      id: 'userId',
      name: 'User Name',
      email: user.email,
    });
  });

  test('It should return null if workspace is not found', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'nonExistentWorkspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.DEFAULT };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue(null);

    const result = await addUserToWorkspace.addUserToWorkspace(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeNull();
  });

  test('It should return null if user is authenticated user', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'auth@example.com', role: WorkspaceRoles.DEFAULT };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });

    const result = await addUserToWorkspace.addUserToWorkspace(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeNull();
  });

  test('It should return null when the authenticated user role is null', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = {
      email: 'user@example.com',
      role: WorkspaceRoles.DEFAULT,
    };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(null);

    const result = await addUserToWorkspace.addUserToWorkspace(
      authenticatedUser,
      workspaceId,
      user,
    );
    expect(result).toBeNull();
  });

  test('It should return null when the authenticated user does not have the ADD_USER_TO_WORKSPACE permission', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = {
      email: 'user@example.com',
      role: WorkspaceRoles.DEFAULT,
    };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.DEFAULT,
    );

    const result = await addUserToWorkspace.addUserToWorkspace(
      authenticatedUser,
      workspaceId,
      user,
    );
    expect(result).toBeNull();
  });

  test('It should return null when the authenticated user tries to add a user with the same role level as him', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = {
      email: 'user@example.com',
      role: WorkspaceRoles.MANAGER,
    };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );

    const result = await addUserToWorkspace.addUserToWorkspace(
      authenticatedUser,
      workspaceId,
      user,
    );
    expect(result).toBeNull();
  });

  test('It should return null when the authenticated user tries to add a user with a higher role than him', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = {
      email: 'user@example.com',
      role: WorkspaceRoles.OWNER,
    };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue(() =>
      Promise.resolve({
        id: workspaceId,
      }),
    );
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );

    const result = await addUserToWorkspace.addUserToWorkspace(
      authenticatedUser,
      workspaceId,
      user,
    );
    expect(result).toBeNull();
  });

  test('It should return null if user cannot be found by email', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.DEFAULT };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue(null);

    const result = await addUserToWorkspace.addUserToWorkspace(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeNull();
  });

  test('It should return null if the user is already in the workspace', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.DEFAULT };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User Name',
      email: user.email,
    });
    mockCheckUserExistInWorkspaceRepository.checkUserInWorkspace.mockResolvedValue(
      true,
    );

    const result = await addUserToWorkspace.addUserToWorkspace(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeNull();
  });

  test('It should return null if adding user to workspace fails', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.DEFAULT };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValue(
      WorkspaceRoles.MANAGER,
    );
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User Name',
      email: user.email,
    });
    mockCheckUserExistInWorkspaceRepository.checkUserInWorkspace.mockResolvedValue(
      false,
    );
    mockAddUserToWorkspaceRepository.addUserToWorkspace.mockResolvedValue(
      false,
    );

    const result = await addUserToWorkspace.addUserToWorkspace(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeNull();
  });
});
