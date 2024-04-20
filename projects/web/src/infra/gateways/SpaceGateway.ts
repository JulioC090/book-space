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
      params: { workspaceId },
      url: '/workspace/:workspaceId/space',
      body: { ...space },
    });

    if (response.status !== HttpCode.CREATED) return null;
    return response.body!;
  }

  async delete(workspaceId: string, spaceId: string): Promise<boolean> {
    throw new Error();
  }

  async update(
    workspaceId: string,
    partialSpace: Partial<Omit<Space, 'id'>>,
  ): Promise<boolean> {
    throw new Error();
  }
}
