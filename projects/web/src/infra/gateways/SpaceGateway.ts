/* eslint-disable @typescript-eslint/no-unused-vars */
import ISpaceGateway from '@/infra/protocols/gateways/ISpaceGateway';
import IHttpClient from '@/infra/protocols/http/IHttpClient';
import { HttpCode } from '@/infra/protocols/http/httpCodes';
import Space from '@/models/Space';

export default class SpaceGateway implements ISpaceGateway {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async add(
    workspaceId: string,
    space: Omit<Space, 'id'>,
  ): Promise<Space | null> {
    const response = await this.httpClient.post<Omit<Space, 'id'>, Space>({
      url: '/workspace/:workspaceId/space',
      params: { workspaceId },
      body: { ...space },
    });

    if (response.status !== HttpCode.CREATED) return null;
    return response.body!;
  }

  async update(
    workspaceId: string,
    spaceId: string,
    partialSpace: Partial<Omit<Space, 'id'>>,
  ): Promise<boolean> {
    const response = await this.httpClient.patch({
      url: '/workspace/:workspaceId/space/:spaceId',
      params: { workspaceId, spaceId },
      body: partialSpace,
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
}
