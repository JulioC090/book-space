import Resource from '@/domain/models/Resource';
import { prisma } from '@/infra/database/prisma/prismaClient';
import IAddWorkspaceResourceRepository from '@/infra/protocols/repositories/IAddWorkspaceResourceRepository';
import ICheckResourceNameRepository from '@/infra/protocols/repositories/ICheckResourceNameRepository';
import IDeleteWorkspaceResourceRepository from '@/infra/protocols/repositories/IDeleteWorkspaceResourceRepository';

export default class WorkspaceResourcePrismaRepository
  implements
    ICheckResourceNameRepository,
    IAddWorkspaceResourceRepository,
    IDeleteWorkspaceResourceRepository
{
  async checkName(workspaceId: string, name: string): Promise<boolean> {
    const resource = await prisma.resource.findFirst({
      where: { AND: [{ workspaceId }, { name }] },
    });
    return !!resource;
  }

  async add(
    workspaceId: string,
    resource: Omit<Resource, 'id'>,
  ): Promise<Resource | null> {
    const addedResource = await prisma.resource.create({
      data: { workspaceId, ...resource },
    });
    return { id: addedResource.id, name: addedResource.name };
  }

  async delete(resourceId: string): Promise<boolean> {
    const deletedResources = await prisma.resource.deleteMany({
      where: { id: resourceId },
    });
    return deletedResources.count > 0;
  }
}
