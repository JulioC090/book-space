/* eslint-disable @typescript-eslint/no-unused-vars */
import ISpaceGateway from '@/infra/protocols/gateways/ISpaceGateway';
import ISpaceService from '@/infra/protocols/services/ISpaceService';
import Space from '@/models/Space';

export default class SpaceService implements ISpaceService {
  private spaceGateway: ISpaceGateway;

  constructor(spaceGateway: ISpaceGateway) {
    this.spaceGateway = spaceGateway;
  }

  async add(
    workspaceId: string,
    space: Omit<Space, 'id'>,
  ): Promise<Space | null> {
    const newSpace: Omit<Space, 'id'> = {
      ...space,
      maxAmountOfPeople: space.maxAmountOfPeople
        ? Number(space.maxAmountOfPeople)
        : undefined,
    };
    return await this.spaceGateway.add(workspaceId, newSpace);
  }

  async update(
    workspaceId: string,
    partialSpace: Partial<Omit<Space, 'id'>>,
  ): Promise<boolean> {
    throw new Error();
  }

  async delete(workspaceId: string, spaceId: string): Promise<boolean> {
    throw new Error();
  }
}
