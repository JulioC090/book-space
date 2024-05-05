import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import IAddSpace from '@/domain/protocols/usecases/IAddSpace';
import AddSpace from '@/domain/usecases/AddSpace';

const mockLoadUserRoleRepository = {
  loadUserRole: jest.fn(),
};

const mockAddSpaceRepository = {
  add: jest.fn(),
};

describe('AddSpace', () => {
  let addSpace: IAddSpace;

  beforeEach(() => {
    addSpace = new AddSpace(mockLoadUserRoleRepository, mockAddSpaceRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should return null if user role is not found', async () => {
    const authenticatedUser = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const space = {
      name: 'SpaceName',
      description: 'SpaceDescription',
      workspaceId: 'workspaceId',
      availabilityRange: [],
    };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValueOnce(null);

    const result = await addSpace.add(authenticatedUser, workspaceId, space);

    expect(result).toBeNull();
  });

  test('It should return null if user does not have permission to add space', async () => {
    const authenticatedUser = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const space = {
      name: 'SpaceName',
      description: 'SpaceDescription',
      workspaceId: 'workspaceId',
      availabilityRange: [],
    };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValueOnce(
      WorkspaceRoles.DEFAULT,
    );

    const result = await addSpace.add(authenticatedUser, workspaceId, space);

    expect(result).toBeNull();
  });

  test('It should return null if adding space fails', async () => {
    const authenticatedUser = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const space = {
      name: 'SpaceName',
      description: 'SpaceDescription',
      workspaceId: 'workspaceId',
      availabilityRange: [],
    };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValueOnce(
      WorkspaceRoles.OWNER,
    );
    mockAddSpaceRepository.add.mockResolvedValueOnce(undefined);

    const result = await addSpace.add(authenticatedUser, workspaceId, space);

    expect(result).toBeNull();
  });

  test('It should return the added space if successful', async () => {
    const authenticatedUser = {
      id: 'authUserId',
      email: 'auth@example.com',
      name: 'auth user',
    };
    const workspaceId = 'workspaceId';
    const space = {
      name: 'SpaceName',
      description: 'SpaceDescription',
      workspaceId: 'workspaceId',
      availabilityRange: [],
    };

    mockLoadUserRoleRepository.loadUserRole.mockResolvedValueOnce(
      WorkspaceRoles.OWNER,
    );
    mockAddSpaceRepository.add.mockResolvedValueOnce({
      id: 'spaceId',
      resources: [],
      ...space,
    });

    const result = await addSpace.add(authenticatedUser, workspaceId, space);

    expect(result).toEqual({
      id: 'spaceId',
      resources: [],
      ...space,
    });
  });
});
