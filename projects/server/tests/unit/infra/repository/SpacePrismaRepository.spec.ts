import SpacePrismaRepository from '@/infra/database/prisma/SpacePrismaRepository';
import { prisma } from '@/infra/database/prisma/prismaClient';

jest.mock('@/infra/database/prisma/prismaClient', () => ({
  prisma: {
    space: {
      findFirst: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
      updateMany: jest.fn(),
    },
  },
}));

const mockFindFirst = prisma.space.findFirst as jest.Mock;
const mockCreate = prisma.space.create as jest.Mock;
const mockDeleteMany = prisma.space.deleteMany as jest.Mock;
const mockUpdateMany = prisma.space.updateMany as jest.Mock;

const spaceRepository = new SpacePrismaRepository();

describe('SpacePrismaRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should check if space is in workspace', async () => {
    mockFindFirst.mockResolvedValueOnce({
      id: 'spaceId',
      name: 'spaceName',
      description: 'spaceDescription',
      workspaceId: 'workspaceId',
      maxAmountOfPeople: null,
    });

    const result = await spaceRepository.isInWorkspace(
      'workspaceId',
      'spaceId',
    );

    expect(prisma.space.findFirst).toHaveBeenCalledWith({
      where: { AND: [{ workspaceId: 'workspaceId' }, { id: 'spaceId' }] },
    });
    expect(result).toBeTruthy();
  });

  test('It should return false if space is not in workspace', async () => {
    mockFindFirst.mockResolvedValueOnce(null);

    const result = await spaceRepository.isInWorkspace(
      'workspaceId',
      'spaceId',
    );

    expect(prisma.space.findFirst).toHaveBeenCalledWith({
      where: { AND: [{ workspaceId: 'workspaceId' }, { id: 'spaceId' }] },
    });
    expect(result).toBeFalsy();
  });

  test('It should add space to workspace', async () => {
    const space = {
      name: 'Sala 3',
      description: 'Localizada no andar debaixo',
    };

    const spaceId = 'spaceId';
    const workspaceId = 'workspaceId';

    mockCreate.mockResolvedValueOnce({
      id: spaceId,
      name: space.name,
      description: space.description,
      workspaceId,
      maxAmountOfPeople: null,
    });

    const result = await spaceRepository.add(workspaceId, space);

    expect(mockCreate).toHaveBeenCalledWith({
      data: { workspaceId: 'workspaceId', ...space },
    });
    expect(result?.maxAmountOfPeople).toBeUndefined();
    expect(result).toEqual({ id: spaceId, workspaceId, ...space });
  });

  test('It should add space to workspace with maxAmountOfPeople', async () => {
    const space = {
      name: 'Sala 3',
      description: 'Localizada no andar debaixo',
      maxAmountOfPeople: 2,
    };

    const spaceId = 'spaceId';
    const workspaceId = 'workspaceId';

    mockCreate.mockResolvedValueOnce({
      id: spaceId,
      workspaceId,
      ...space,
    });

    const result = await spaceRepository.add(workspaceId, space);

    expect(mockCreate).toHaveBeenCalledWith({
      data: { workspaceId: 'workspaceId', ...space },
    });
    expect(result?.maxAmountOfPeople).toBeDefined();
    expect(result).toEqual({ id: spaceId, workspaceId, ...space });
  });

  test('It should update space successfully', async () => {
    const spaceId = 'spaceId';
    const partialSpace = { name: 'newName' };

    mockUpdateMany.mockResolvedValue({ count: 1 });

    const result = await spaceRepository.update(spaceId, partialSpace);

    expect(prisma.space.updateMany).toHaveBeenCalledWith({
      where: { id: spaceId },
      data: { ...partialSpace },
    });
    expect(result).toBeTruthy();
  });

  test('It should return false if failed to update space', async () => {
    const spaceId = 'spaceId';
    const partialSpace = { name: 'newName' };

    mockUpdateMany.mockResolvedValue({ count: 0 });

    const result = await spaceRepository.update(spaceId, partialSpace);

    expect(prisma.space.updateMany).toHaveBeenCalledWith({
      where: { id: spaceId },
      data: { ...partialSpace },
    });
    expect(result).toBeFalsy();
  });

  test('It should delete space', async () => {
    const spaceId = 'spaceId';

    mockDeleteMany.mockResolvedValueOnce({ count: 1 });

    const result = await spaceRepository.delete(spaceId);

    expect(mockDeleteMany).toHaveBeenCalledWith({
      where: { id: spaceId },
    });
    expect(result).toBeTruthy();
  });

  test('It should return false if failed to delete space', async () => {
    const spaceId = 'spaceId';

    mockDeleteMany.mockResolvedValueOnce({ count: 0 });

    const result = await spaceRepository.delete(spaceId);

    expect(mockDeleteMany).toHaveBeenCalledWith({
      where: { id: spaceId },
    });
    expect(result).toBeFalsy();
  });
});
