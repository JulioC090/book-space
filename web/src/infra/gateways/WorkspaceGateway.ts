import IAddWorkspaceGateway from '@/infra/protocols/gateways/IAddWorkspaceGateway';
import IUpdateWorkspaceGateway from '@/infra/protocols/gateways/IUpdateWorkspaceGateway';
import IHttpClient from '@/infra/protocols/http/IHttpClient';
import { Workspace } from '@/models/Workspace';

export default class WorkspaceGateway
  implements IAddWorkspaceGateway, IUpdateWorkspaceGateway
{
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async add(workspace: Omit<Workspace, 'id'>): Promise<boolean> {
    const httpClientResponse = await this.httpClient.post<
      Omit<Workspace, 'id'>
    >({ url: '/workspace', body: workspace });

    return httpClientResponse.status === 201;
  }

  async update(
    workspaceId: string,
    workspace: Omit<Workspace, 'id'>,
  ): Promise<boolean> {
    const httpClientResponse = await this.httpClient.patch<
      Omit<Workspace, 'id'>
    >({
      url: '/workspace/:workspaceId',
      params: { workspaceId },
      body: workspace,
    });

    return httpClientResponse.status === 200;
  }
}
