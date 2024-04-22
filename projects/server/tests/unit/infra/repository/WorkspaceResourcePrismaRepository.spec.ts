import Resource from '@/domain/models/Resource';
import WorkspaceResourcePrismaRepository from '@/infra/database/prisma/WorkspaceResourcePrismaRepository';
import { prisma } from '@/infra/database/prisma/prismaClient';

jest.mock('@/infra/database/prisma/prismaClient', () => ({
  prisma: {
    resource: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  },
}));

const mockFindFirst = prisma.resource.findFirst as jest.Mock;
const mockCreate = prisma.resource.create as jest.Mock;

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
});
