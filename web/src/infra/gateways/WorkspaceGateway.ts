import IAddUserInWorkspaceGateway, {
  IAddUserInWorkspaceGatewayOutput,
} from '@/infra/protocols/gateways/IAddUserInWorkspaceGateway';
import IAddWorkspaceGateway, {
  IAddWorkspaceGatewayOutput,
} from '@/infra/protocols/gateways/IAddWorkspaceGateway';
import IDeleteUserInWorkspace from '@/infra/protocols/gateways/IDeleteUserInWorkspaceGateway';
import IDeleteWorkspace from '@/infra/protocols/gateways/IDeleteWorkspaceGateway';
import ILoadWorkspaceDetailsGateway from '@/infra/protocols/gateways/ILoadWorkspaceDetailsGateway';
import ILoadWorkspaceGateway from '@/infra/protocols/gateways/ILoadWorkspaceGateway';
import IUpdateWorkspaceGateway from '@/infra/protocols/gateways/IUpdateWorkspaceGateway';
import IHttpClient from '@/infra/protocols/http/IHttpClient';
import { Workspace } from '@/models/Workspace';

export default class WorkspaceGateway
  implements
    IAddWorkspaceGateway,
    IUpdateWorkspaceGateway,
    ILoadWorkspaceGateway,
    IDeleteWorkspace,
    ILoadWorkspaceDetailsGateway,
    IAddUserInWorkspaceGateway,
    IDeleteUserInWorkspace
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

  async loadWorkspaceDetails(
    workspaceId: string,
  ): Promise<Required<Workspace> | undefined> {
    const response = await this.httpClient.get<Required<Workspace>>({
      url: '/workspace/:workspaceId',
      params: { workspaceId },
    });

    if (!response) return undefined;

    return response.body!;
  }

  async add(
    workspace: Omit<Workspace, 'id' | 'role'>,
  ): Promise<IAddWorkspaceGatewayOutput> {
    const httpClientResponse = await this.httpClient.post<
      Omit<Workspace, 'id' | 'role'>,
      IAddWorkspaceGatewayOutput
    >({ url: '/workspace', body: workspace });

    return httpClientResponse.body;
  }

  async update(
    workspaceId: string,
    workspace: Omit<Workspace, 'id' | 'role'>,
  ): Promise<boolean> {
    const httpClientResponse = await this.httpClient.patch<
      Omit<Workspace, 'id' | 'role'>
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

  async addUser(
    workspaceId: string,
    userEmail: string,
  ): Promise<IAddUserInWorkspaceGatewayOutput | undefined> {
    const response = await this.httpClient.post<
      { userEmail: string },
      IAddUserInWorkspaceGatewayOutput
    >({
      url: '/workspace/:workspaceId/user',
      params: { workspaceId },
      body: { userEmail },
    });

    if (response.status !== 201) return;

    return response.body;
  }

  async deleteUser(workspaceId: string, userEmail: string): Promise<boolean> {
    const response = await this.httpClient.delete({
      url: '/workspace/:workspaceId/user',
      params: { workspaceId },
      body: { userEmail },
    });

    return response.status === 200;
  }
}
