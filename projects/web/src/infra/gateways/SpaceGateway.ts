/* eslint-disable @typescript-eslint/no-unused-vars */
import ISpaceGateway from '@/infra/protocols/gateways/ISpaceGateway';
import IHttpClient from '@/infra/protocols/http/IHttpClient';
import { HttpCode } from '@/infra/protocols/http/httpCodes';
import Booking from '@/models/Booking';
import Space from '@/models/Space';

export default class SpaceGateway implements ISpaceGateway {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }
  async loadAll(): Promise<Array<Required<Space>>> {
    const response = await this.httpClient.get<Array<Required<Space>>>({
      url: '/spaces',
    });

    if (!response.body) return [];
    return response.body!;
  }

  async add(
    workspaceId: string,
    space: Omit<Space, 'id'>,
    resources?: Array<string>,
  ): Promise<Space | null> {
    const response = await this.httpClient.post<
      Omit<Space, 'id' | 'resources'> & { resources?: Array<string> },
      Space
    >({
      url: '/workspace/:workspaceId/space',
      params: { workspaceId },
      body: { ...space, resources },
    });

    if (response.status !== HttpCode.CREATED) return null;
    return response.body!;
  }

  async update(
    workspaceId: string,
    spaceId: string,
    partialSpace: Partial<Omit<Space, 'id'>>,
    resources?: Array<string>,
  ): Promise<boolean> {
    const response = await this.httpClient.patch<
      Partial<Omit<Space, 'id' | 'resources'> & { resources: Array<string> }>
    >({
      url: '/workspace/:workspaceId/space/:spaceId',
      params: { workspaceId, spaceId },
      body: {
        name: partialSpace.name,
        description: partialSpace.description,
        maxAmountOfPeople: partialSpace.maxAmountOfPeople,
        availabilityRange: partialSpace.availabilityRange,
        resources,
      },
    });

    return response.status === HttpCode.OK;
  }

  async delete(workspaceId: string, spaceId: string): Promise<boolean> {
    const response = await this.httpClient.delete({
      url: '/workspace/:workspaceId/space/:spaceId',
      params: { workspaceId, spaceId },
    });
    return response.status === HttpCode.OK;
  }

  async bookSpace(
    spaceId: string,
    booking: Booking,
  ): Promise<Required<Booking> | null> {
    const response = await this.httpClient.post<Booking, Required<Booking>>({
      url: '/space/:spaceId/book',
      params: { spaceId },
      body: booking,
    });

    if (response.status !== HttpCode.CREATED) return null;
    return response.body!;
  }
}
