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
    resources?: Array<string>,
  ): Promise<Space | null> {
    const newSpace: Omit<Space, 'id'> = {
      ...space,
      maxAmountOfPeople: Number(space.maxAmountOfPeople) || undefined,
      availabilityRange: space.availabilityRange?.map((value) => ({
        ...value,
        startTime: `${value.startTime}:00`,
        endTime: `${value.endTime}:00`,
      })),
    };
    return await this.spaceGateway.add(workspaceId, newSpace, resources);
  }

  async update(
    workspaceId: string,
    spaceId: string,
    partialSpace: Partial<Omit<Space, 'id'>>,
    resources?: Array<string>,
  ): Promise<boolean> {
    const updateSpace: Partial<Omit<Space, 'id'>> = {
      ...partialSpace,
      maxAmountOfPeople: Number(partialSpace.maxAmountOfPeople) || null,
      availabilityRange: partialSpace.availabilityRange?.map((value) => ({
        ...value,
        startTime: `${value.startTime}:00`,
        endTime: `${value.endTime}:00`,
      })),
    };
    return await this.spaceGateway.update(
      workspaceId,
      spaceId,
      updateSpace,
      resources,
    );
  }

  async delete(workspaceId: string, spaceId: string): Promise<boolean> {
    return await this.spaceGateway.delete(workspaceId, spaceId);
  }
}
