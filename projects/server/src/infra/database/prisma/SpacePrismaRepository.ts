import Space from '@/domain/models/Space';
import SpaceAvailability from '@/domain/models/SpaceAvailability';
import { prisma } from '@/infra/database/prisma/prismaClient';
import IAddSpaceRepository from '@/infra/protocols/repositories/IAddSpaceRepository';
import ICheckSpaceIsInWorkspaceRepository from '@/infra/protocols/repositories/ICheckSpaceIsInWorkspaceRepository';
import ICheckUserSpaceAccessRepository from '@/infra/protocols/repositories/ICheckUserSpaceAccessRepository';
import IDeleteSpaceRepository from '@/infra/protocols/repositories/IDeleteSpaceRepository';
import ILoadSpaceAvailabilityRepository from '@/infra/protocols/repositories/ILoadSpaceAvailabilityRepository';
import ILoadUserSpacesRepository from '@/infra/protocols/repositories/ILoadUserSpacesRepository';
import IUpdateSpaceRepository from '@/infra/protocols/repositories/IUpdateSpaceRepository';

export default class SpacePrismaRepository
  implements
    ICheckSpaceIsInWorkspaceRepository,
    ICheckUserSpaceAccessRepository,
    ILoadSpaceAvailabilityRepository,
    ILoadUserSpacesRepository,
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

  async verifyUserAccess(userId: string, spaceId: string): Promise<boolean> {
    const workspace = await prisma.space.findFirst({
      where: { id: spaceId },
      select: { Workspace: true },
    });

    if (!workspace) return false;
    if (workspace.Workspace.ownerId === userId) return true;

    const user = await prisma.workspace.findFirst({
      where: {
        id: workspace.Workspace.id,
        users: { some: { userId } },
      },
    });

    return !!user;
  }

  async loadSpaceAvailability(spaceId: string): Promise<SpaceAvailability[]> {
    const space = await prisma.space.findFirst({
      where: { id: spaceId },
      select: { availabilityRange: true },
    });
    return space!.availabilityRange;
  }

  async loadUserSpaces(userId: string): Promise<Space[]> {
    const workspaces = await prisma.workspace.findMany({
      where: {
        OR: [{ ownerId: userId }, { users: { some: { userId } } }],
      },
      select: {
        id: true,
        name: true,
        tag: true,
        spaces: {
          include: {
            availabilityRange: true,
            resources: {
              select: { Resource: { select: { id: true, name: true } } },
            },
          },
        },
      },
    });

    return workspaces.flatMap((workspace) =>
      workspace.spaces.map((space) => ({
        id: space.id,
        name: space.name,
        description: space.description,
        maxAmountOfPeople: space.maxAmountOfPeople,
        resources: space.resources.map((r) => ({
          id: r.Resource.id,
          name: r.Resource.name,
        })),
        availabilityRange: space.availabilityRange,
        workspace: {
          id: workspace.id,
          name: workspace.name,
          tag: workspace.tag,
        },
      })),
    );
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
        availabilityRange: {
          createMany: { data: space.availabilityRange },
        },
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
        availabilityRange: {
          select: { weekday: true, startTime: true, endTime: true },
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
        availabilityRange: partialSpace.availabilityRange && {
          deleteMany: { spaceId },
          createMany: { data: partialSpace.availabilityRange },
        },
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
    await prisma.spaceResources.deleteMany({
      where: { spaceId },
    });

    const deletedSpace = await prisma.space.deleteMany({
      where: { id: spaceId },
    });
    return deletedSpace.count > 0;
  }
}
