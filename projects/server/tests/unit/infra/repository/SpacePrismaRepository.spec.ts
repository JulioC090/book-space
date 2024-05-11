import SpacePrismaRepository from '@/infra/database/prisma/SpacePrismaRepository';
import { prisma } from '@/infra/database/prisma/prismaClient';
import timeToDateConverter from '@/presentation/helpers/timeToDateConverter';

jest.mock('@/infra/database/prisma/prismaClient', () => ({
  prisma: {
    space: {
      findFirst: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
      update: jest.fn(),
    },
    spaceResources: {
      deleteMany: jest.fn(),
    },
    spaceAvailability: {
      deleteMany: jest.fn(),
    },
    booking: {
      deleteMany: jest.fn(),
    },
  },
}));

const mockFindFirst = prisma.space.findFirst as jest.Mock;
const mockCreate = prisma.space.create as jest.Mock;
const mockDeleteMany = prisma.space.deleteMany as jest.Mock;
const mockUpdate = prisma.space.update as jest.Mock;

const mockSpaceResourcesDeleteMany = prisma.spaceResources
  .deleteMany as jest.Mock;

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
      availabilityRange: [],
    };

    const spaceId = 'spaceId';
    const workspaceId = 'workspaceId';

    mockCreate.mockResolvedValueOnce({
      id: spaceId,
      name: space.name,
      description: space.description,
      workspaceId,
      maxAmountOfPeople: null,
      availabilityRange: [],
    });

    const result = await spaceRepository.add(workspaceId, space);

    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        workspaceId: 'workspaceId',
        ...space,
        availabilityRange: {
          createMany: { data: [] },
        },
        resources: { createMany: { data: [] } },
      },
      include: {
        resources: {
          select: { Resource: { select: { id: true, name: true } } },
        },
        availabilityRange: {
          select: { weekday: true, startTime: true, endTime: true },
        },
      },
    });
    expect(result?.maxAmountOfPeople).toBeUndefined();
    expect(result).toEqual({
      id: spaceId,
      workspaceId,
      ...space,
      resources: [],
      availabilityRange: [],
    });
  });

  test('It should add space to workspace with maxAmountOfPeople', async () => {
    const space = {
      name: 'Sala 3',
      description: 'Localizada no andar debaixo',
      maxAmountOfPeople: 2,
      availabilityRange: [],
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
      data: {
        workspaceId: 'workspaceId',
        ...space,
        availabilityRange: {
          createMany: { data: [] },
        },
        resources: { createMany: { data: [] } },
      },
      include: {
        resources: {
          select: { Resource: { select: { id: true, name: true } } },
        },
        availabilityRange: {
          select: { weekday: true, startTime: true, endTime: true },
        },
      },
    });
    expect(result?.maxAmountOfPeople).toBeDefined();
    expect(result).toEqual({
      id: spaceId,
      workspaceId,
      ...space,
      resources: [],
    });
  });

  test('It should add space to workspace with resources', async () => {
    const space = {
      name: 'Sala 3',
      description: 'Localizada no andar debaixo',
      availabilityRange: [],
    };

    const resources = ['resource1', 'resource2'];

    const spaceId = 'spaceId';
    const workspaceId = 'workspaceId';

    mockCreate.mockResolvedValueOnce({
      id: spaceId,
      workspaceId,
      ...space,
      resources: resources.map((resource) => ({
        Resource: {
          id: resource,
          name: resource,
        },
      })),
    });

    const result = await spaceRepository.add(workspaceId, space, resources);

    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        workspaceId: 'workspaceId',
        ...space,
        availabilityRange: {
          createMany: { data: [] },
        },
        resources: {
          createMany: {
            data: resources.map((resource) => ({ resourceId: resource })),
          },
        },
      },
      include: {
        resources: {
          select: { Resource: { select: { id: true, name: true } } },
        },
        availabilityRange: {
          select: { weekday: true, startTime: true, endTime: true },
        },
      },
    });
    expect(result).toEqual({
      id: spaceId,
      workspaceId,
      ...space,
      resources: resources.map((resource) => ({
        id: resource,
        name: resource,
      })),
    });
  });

  test('It should update space successfully', async () => {
    const spaceId = 'spaceId';
    const partialSpace = { name: 'newName' };

    mockUpdate.mockResolvedValue({ count: 1 });

    const result = await spaceRepository.update(spaceId, partialSpace);

    expect(prisma.space.update).toHaveBeenCalledWith({
      where: { id: spaceId },
      data: {
        ...partialSpace,
        resources: {
          connectOrCreate: [],
          deleteMany: {
            spaceId,
            NOT: undefined,
          },
        },
      },
    });
    expect(result).toBeTruthy();
  });

  test('It should update space with resources successfully', async () => {
    const spaceId = 'spaceId';
    const partialSpace = { name: 'newName' };
    const resources = ['resource1', 'resource2'];

    mockUpdate.mockResolvedValue({ count: 1 });

    const result = await spaceRepository.update(
      spaceId,
      partialSpace,
      resources,
    );

    expect(prisma.space.update).toHaveBeenCalledWith({
      where: { id: spaceId },
      data: {
        ...partialSpace,
        resources: {
          connectOrCreate: resources.map((resource) => ({
            where: {
              spaceId_resourceId: { spaceId, resourceId: resource },
            },
            create: { resourceId: resource },
          })),
          deleteMany: {
            spaceId,
            NOT: resources?.map((resource) => ({ resourceId: resource })),
          },
        },
      },
    });
    expect(result).toBeTruthy();
  });

  test('It should update space with availability successfully', async () => {
    const spaceId = 'spaceId';
    const partialSpace = {
      name: 'newName',
      availabilityRange: [
        {
          weekday: 1,
          startTime: timeToDateConverter('08:00:00'),
          endTime: timeToDateConverter('12:00:00'),
        },
      ],
    };
    const resources = ['resource1', 'resource2'];

    mockUpdate.mockResolvedValue({ count: 1 });

    const result = await spaceRepository.update(
      spaceId,
      partialSpace,
      resources,
    );

    expect(prisma.space.update).toHaveBeenCalledWith({
      where: { id: spaceId },
      data: {
        ...partialSpace,
        availabilityRange: {
          deleteMany: { spaceId },
          createMany: { data: partialSpace.availabilityRange },
        },
        resources: {
          connectOrCreate: resources.map((resource) => ({
            where: {
              spaceId_resourceId: { spaceId, resourceId: resource },
            },
            create: { resourceId: resource },
          })),
          deleteMany: {
            spaceId,
            NOT: resources?.map((resource) => ({ resourceId: resource })),
          },
        },
      },
    });
    expect(result).toBeTruthy();
  });

  test('It should return false if failed to update space', async () => {
    const spaceId = 'spaceId';
    const partialSpace = { name: 'newName' };

    mockUpdate.mockResolvedValue(false);

    const result = await spaceRepository.update(spaceId, partialSpace);
    expect(result).toBeFalsy();
  });

  test('It should delete space', async () => {
    const spaceId = 'spaceId';

    mockDeleteMany.mockResolvedValueOnce({ count: 1 });

    const result = await spaceRepository.delete(spaceId);

    expect(mockSpaceResourcesDeleteMany).toHaveBeenCalledWith({
      where: { spaceId },
    });
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
