import IAddWorkspaceGateway, {
  IAddWorkspaceGatewayOutput,
} from '@/infra/protocols/gateways/IAddWorkspaceGateway';
import IDeleteWorkspace from '@/infra/protocols/gateways/IDeleteWorkspaceGateway';
import ILoadWorkspaceGateway from '@/infra/protocols/gateways/ILoadWorkspaceGateway';
import IUpdateWorkspaceGateway from '@/infra/protocols/gateways/IUpdateWorkspaceGateway';
import IHttpClient from '@/infra/protocols/http/IHttpClient';
import { Workspace } from '@/models/Workspace';

export default class WorkspaceGateway
  implements
    IAddWorkspaceGateway,
    IUpdateWorkspaceGateway,
    ILoadWorkspaceGateway,
    IDeleteWorkspace
{
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async load(): Promise<Array<Workspace>> {
    const response = await this.httpClient.get<Array<Workspace>>({
      url: '/workspaces',
    });

    return response ? response.body! : [];
  }

  async add(
    workspace: Omit<Workspace, 'id'>,
  ): Promise<IAddWorkspaceGatewayOutput> {
    const httpClientResponse = await this.httpClient.post<
      Omit<Workspace, 'id'>,
      IAddWorkspaceGatewayOutput
    >({ url: '/workspace', body: workspace });

    return httpClientResponse.body;
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

  async delete(workspaceId: string): Promise<boolean> {
    const response = await this.httpClient.delete({
      url: '/workspace/:workspaceId',
      params: { workspaceId },
    });

    return response.status === 200;
  }
}
