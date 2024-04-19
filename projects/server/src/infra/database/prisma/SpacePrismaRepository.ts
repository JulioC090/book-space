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
  ): Promise<Space | undefined> {
    const addedSpace = await prisma.space.create({
      data: { workspaceId, ...space },
    });
    return {
      ...addedSpace,
      workspaceId,
      maxAmountOfPeople: addedSpace.maxAmountOfPeople
        ? addedSpace.maxAmountOfPeople
        : undefined,
    };
  }

  async update(
    spaceId: string,
    partialSpace: Partial<Omit<Space, 'id' | 'workspaceId'>>,
  ): Promise<boolean> {
    const updatedSpace = await prisma.space.updateMany({
      where: { id: spaceId },
      data: { ...partialSpace },
    });

    return updatedSpace.count > 0;
  }

  async delete(spaceId: string): Promise<boolean> {
    const deletedSpace = await prisma.space.deleteMany({
      where: { id: spaceId },
    });
    return deletedSpace.count > 0;
  }
}
