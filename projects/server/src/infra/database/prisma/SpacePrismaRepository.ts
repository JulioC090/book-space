import Space from '@/domain/models/Space';
import { prisma } from '@/infra/database/prisma/prismaClient';
import IAddSpaceRepository from '@/infra/protocols/repositories/IAddSpaceRepository';

export default class SpacePrismaRepository implements IAddSpaceRepository {
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
}
