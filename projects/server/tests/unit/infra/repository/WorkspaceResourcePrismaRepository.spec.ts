import Resource from '@/domain/models/Resource';
import WorkspaceResourcePrismaRepository from '@/infra/database/prisma/WorkspaceResourcePrismaRepository';
import { prisma } from '@/infra/database/prisma/prismaClient';

jest.mock('@/infra/database/prisma/prismaClient', () => ({
  prisma: {
    resource: {
      findFirst: jest.fn(),
      create: jest.fn(),
      deleteMany: jest.fn(),
    },
    spaceResources: {
      deleteMany: jest.fn(),
    },
  },
}));

const mockFindFirst = prisma.resource.findFirst as jest.Mock;
const mockCreate = prisma.resource.create as jest.Mock;
const mockDeleteMany = prisma.resource.deleteMany as jest.Mock;

const workspaceResourceRepository = new WorkspaceResourcePrismaRepository();

describe('WorkspaceResourcePrismaRepository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should checks if the resource name already exists in the workspace', async () => {
    const workspaceId = 'workspaceId';
    const name = 'resourceName';

    mockFindFirst.mockResolvedValue({ id: 'resourceId', name: 'resourceName' });

    const result = await workspaceResourceRepository.checkName(
      workspaceId,
      name,
    );

    expect(prisma.resource.findFirst).toHaveBeenCalledWith({
      where: { AND: [{ workspaceId }, { name }] },
    });
    expect(result).toBeTruthy();
  });

  test('It should return false if the resource name does not exist in the workspace', async () => {
    const workspaceId = 'workspaceId';
    const name = 'resourceName';

    mockFindFirst.mockResolvedValue(null);

    const result = await workspaceResourceRepository.checkName(
      workspaceId,
      name,
    );

    expect(prisma.resource.findFirst).toHaveBeenCalledWith({
      where: { AND: [{ workspaceId }, { name }] },
    });
    expect(result).toBeFalsy();
  });

  test('It should add resource to workspace', async () => {
    const workspaceId = 'workspaceId';
    const resource: Omit<Resource, 'id'> = { name: 'resourceName' };

    mockCreate.mockResolvedValue({ id: 'resourceId', ...resource });

    const result = await workspaceResourceRepository.add(workspaceId, resource);

    expect(prisma.resource.create).toHaveBeenCalledWith({
      data: { workspaceId, ...resource },
    });
    expect(result).toEqual({ id: 'resourceId', ...resource });
  });

  test('It should delete the resource from the workspace', async () => {
    const resourceId = 'resourceId';

    mockDeleteMany.mockResolvedValue({ count: 1 });

    const result = await workspaceResourceRepository.delete(resourceId);

    expect(prisma.spaceResources.deleteMany).toHaveBeenCalledWith({
      where: { resourceId },
    });
    expect(prisma.resource.deleteMany).toHaveBeenCalledWith({
      where: { id: resourceId },
    });
    expect(result).toBeTruthy();
  });

  test('It should return false when delete operation fails', async () => {
    const resourceId = 'resourceId';

    mockDeleteMany.mockResolvedValue({ count: 0 });

    const result = await workspaceResourceRepository.delete(resourceId);

    expect(prisma.resource.deleteMany).toHaveBeenCalledWith({
      where: { id: resourceId },
    });
    expect(result).toBeFalsy();
  });
});
