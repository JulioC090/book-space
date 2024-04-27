import Space from '@/domain/models/Space';
import { prisma } from '@/infra/database/prisma/prismaClient';
import IAddSpaceRepository from '@/infra/protocols/repositories/IAddSpaceRepository';
import ICheckSpaceIsInWorkspaceRepository from '@/infra/protocols/repositories/ICheckSpaceIsInWorkspaceRepository';
import IDeleteSpaceRepository from '@/infra/protocols/repositories/IDeleteSpaceRepository';
import IUpdateSpaceRepository from '@/infra/protocols/repositories/IUpdateSpaceRepository';

export default class SpacePrismaRepository
  implements
    ICheckSpaceIsInWorkspaceRepository,
    IAddSpaceRepository,
    IUpdateSpaceRepository,
    IDeleteSpaceRepository
{
  async isInWorkspace(workspaceId: string, spaceId: string): Promise<boolean> {
    const space = await prisma.space.findFirst({
      where: { AND: [{ workspaceId }, { id: spaceId }] },
    });
    return !!space;
  }

  async add(
    workspaceId: string,
    space: Omit<Space, 'id'>,
    resources?: Array<string>,
  ): Promise<Space | undefined> {
    const addedSpace = await prisma.space.create({
      data: {
        workspaceId,
        ...space,
        resources: {
          createMany: {
            data: resources
              ? resources.map((resource) => ({
                  resourceId: resource,
                }))
              : [],
          },
        },
      },
      include: {
        resources: {
          select: { Resource: { select: { id: true, name: true } } },
        },
      },
    });
    return {
      ...addedSpace,
      workspaceId,
      maxAmountOfPeople: addedSpace.maxAmountOfPeople
        ? addedSpace.maxAmountOfPeople
        : undefined,
      resources: addedSpace.resources
        ? addedSpace.resources.map((resource) => ({
            id: resource.Resource.id,
            name: resource.Resource.name,
          }))
        : [],
    };
  }

  async update(
    spaceId: string,
    partialSpace: Partial<Omit<Space, 'id' | 'workspaceId'>>,
    resources?: Array<string>,
  ): Promise<boolean> {
    const updatedSpace = await prisma.space.update({
      where: { id: spaceId },
      data: {
        ...partialSpace,
        resources: {
          connectOrCreate: resources
            ? resources.map((resource) => ({
                where: {
                  spaceId_resourceId: { spaceId, resourceId: resource },
                },
                create: { resourceId: resource },
              }))
            : [],
          deleteMany: {
            spaceId,
            NOT: resources?.map((resource) => ({ resourceId: resource })),
          },
        },
      },
    });

    return !!updatedSpace;
  }

  async delete(spaceId: string): Promise<boolean> {
    const deletedSpace = await prisma.space.deleteMany({
      where: { id: spaceId },
    });
    return deletedSpace.count > 0;
  }
}
