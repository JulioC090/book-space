import { User } from '@/domain/models/User';
import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import UpdateWorkspaceUserRole from '@/domain/usecases/UpdateWorkspaceUserRole';

const mockLoadUserRoleRepository = {
  loadUserRole: jest.fn(),
};

const mockLoadWorkspaceByIdRepository = {
  loadById: jest.fn(),
};

const mockLoadAccountByEmailRepository = {
  loadByEmail: jest.fn(),
};

const mockUpdateWorkspaceUserRoleRepository = {
  updateUserRole: jest.fn(),
};

describe('UpdateWorkspaceUserRole', () => {
  let updateWorkspaceUserRole: UpdateWorkspaceUserRole;

  beforeEach(() => {
    updateWorkspaceUserRole = new UpdateWorkspaceUserRole(
      mockLoadUserRoleRepository,
      mockLoadWorkspaceByIdRepository,
      mockLoadAccountByEmailRepository,
      mockUpdateWorkspaceUserRoleRepository,
    );
  });

  test('It should change user role in workspace successfully', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.MANAGER };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole
      .mockResolvedValueOnce(WorkspaceRoles.OWNER)
      .mockResolvedValueOnce(WorkspaceRoles.DEFAULT);
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User Name',
      email: user.email,
    });
    mockUpdateWorkspaceUserRoleRepository.updateUserRole.mockResolvedValue(
      true,
    );

    const result = await updateWorkspaceUserRole.updateUserRole(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeTruthy();
  });

  test('It should return null if workspace is not found', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.MANAGER };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue(null);

    const result = await updateWorkspaceUserRole.updateUserRole(
      authenticatedUser,
      workspaceId,
      user,
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
    const user = { email: 'user@example.com', role: WorkspaceRoles.MANAGER };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValueOnce(null);

    const result = await updateWorkspaceUserRole.updateUserRole(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false when the authenticated user does not have the UPDATE_USER_ROLE permission', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.MANAGER };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValueOnce(
      WorkspaceRoles.DEFAULT,
    );

    const result = await updateWorkspaceUserRole.updateUserRole(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false when the authenticated user tries to update a user with the same role level as him', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.MANAGER };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValueOnce(
      WorkspaceRoles.MANAGER,
    );
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User Name',
      email: user.email,
    });
    mockUpdateWorkspaceUserRoleRepository.updateUserRole.mockResolvedValue(
      true,
    );

    const result = await updateWorkspaceUserRole.updateUserRole(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false when the authenticated user tries to update a user with a higher role than him', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.OWNER };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValueOnce(
      WorkspaceRoles.MANAGER,
    );
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User Name',
      email: user.email,
    });
    mockUpdateWorkspaceUserRoleRepository.updateUserRole.mockResolvedValue(
      true,
    );

    const result = await updateWorkspaceUserRole.updateUserRole(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false if user cannot be found by email', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.MANAGER };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole.mockResolvedValueOnce(
      WorkspaceRoles.OWNER,
    );
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue(null);

    const result = await updateWorkspaceUserRole.updateUserRole(
      authenticatedUser,
      workspaceId,
      user,
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
    const user = { email: 'user@example.com', role: WorkspaceRoles.MANAGER };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole
      .mockResolvedValueOnce(WorkspaceRoles.OWNER)
      .mockResolvedValueOnce(null);
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User Name',
      email: user.email,
    });

    const result = await updateWorkspaceUserRole.updateUserRole(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false when user update a higher role', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.MANAGER };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole
      .mockResolvedValueOnce(WorkspaceRoles.OWNER)
      .mockResolvedValueOnce(WorkspaceRoles.OWNER);
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User 2',
      email: user.email,
    });

    const result = await updateWorkspaceUserRole.updateUserRole(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeFalsy();
  });

  test('It should return false if user update fails', async () => {
    const authenticatedUser: Omit<User, 'password'> = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const user = { email: 'user@example.com', role: WorkspaceRoles.MANAGER };

    mockLoadWorkspaceByIdRepository.loadById.mockResolvedValue({
      id: workspaceId,
    });
    mockLoadUserRoleRepository.loadUserRole
      .mockResolvedValueOnce(WorkspaceRoles.OWNER)
      .mockResolvedValueOnce(WorkspaceRoles.DEFAULT);
    mockLoadAccountByEmailRepository.loadByEmail.mockResolvedValue({
      id: 'userId',
      name: 'User Name',
      email: user.email,
    });
    mockUpdateWorkspaceUserRoleRepository.updateUserRole.mockResolvedValue(
      false,
    );

    const result = await updateWorkspaceUserRole.updateUserRole(
      authenticatedUser,
      workspaceId,
      user,
    );

    expect(result).toBeFalsy();
  });
});
