import IAddUserInWorkspaceGateway, {
  IAddUserInWorkspaceGatewayOutput,
} from '@/infra/protocols/gateways/IAddUserInWorkspaceGateway';
import IAddWorkspaceGateway, {
  IAddWorkspaceGatewayOutput,
} from '@/infra/protocols/gateways/IAddWorkspaceGateway';
import IDeleteUserInWorkspace from '@/infra/protocols/gateways/IDeleteUserInWorkspaceGateway';
import IDeleteWorkspaceGateway from '@/infra/protocols/gateways/IDeleteWorkspaceGateway';
import ILeaveWorkspaceGateway from '@/infra/protocols/gateways/ILeaveWorkspaceGateway';
import ILoadWorkspaceDetailsGateway from '@/infra/protocols/gateways/ILoadWorkspaceDetailsGateway';
import ILoadWorkspaceGateway from '@/infra/protocols/gateways/ILoadWorkspaceGateway';
import IUpdateWorkspaceGateway from '@/infra/protocols/gateways/IUpdateWorkspaceGateway';
import IUpdateWorkspaceUserRoleGateway from '@/infra/protocols/gateways/IUpdateWorkspaceUserRoleGateway';
import IHttpClient from '@/infra/protocols/http/IHttpClient';
import { HttpCode } from '@/infra/protocols/http/httpCodes';
import { Workspace } from '@/models/Workspace';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';

export default class WorkspaceGateway
  implements
    IAddWorkspaceGateway,
    IUpdateWorkspaceGateway,
    ILoadWorkspaceGateway,
    IDeleteWorkspaceGateway,
    ILoadWorkspaceDetailsGateway,
    IAddUserInWorkspaceGateway,
    IUpdateWorkspaceUserRoleGateway,
    IDeleteUserInWorkspace,
    ILeaveWorkspaceGateway
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

    return httpClientResponse.status === HttpCode.OK;
  }

  async delete(workspaceId: string): Promise<boolean> {
    const response = await this.httpClient.delete({
      url: '/workspace/:workspaceId',
      params: { workspaceId },
    });

    return response.status === HttpCode.OK;
  }

  async addUser(
    workspaceId: string,
    userEmail: string,
    role: WorkspaceRoles,
  ): Promise<IAddUserInWorkspaceGatewayOutput | undefined> {
    const response = await this.httpClient.post<
      { userEmail: string; role: WorkspaceRoles },
      IAddUserInWorkspaceGatewayOutput
    >({
      url: '/workspace/:workspaceId/user',
      params: { workspaceId },
      body: { userEmail, role },
    });

    if (response.status !== HttpCode.CREATED) return;

    return { ...response.body!, role };
  }

  async updateUserRole(
    workspaceId: string,
    userEmail: string,
    role: WorkspaceRoles,
  ): Promise<boolean> {
    const response = await this.httpClient.put({
      url: '/workspace/:workspaceId/user',
      params: { workspaceId },
      body: { userEmail, role },
    });
    if (!response) return false;

    return response.status === HttpCode.OK;
  }

  async deleteUser(workspaceId: string, userEmail: string): Promise<boolean> {
    const response = await this.httpClient.delete({
      url: '/workspace/:workspaceId/user',
      params: { workspaceId },
      body: { userEmail },
    });

    return response.status === HttpCode.OK;
  }

  async leave(workspaceId: string): Promise<boolean> {
    const response = await this.httpClient.delete({
      url: '/workspace/:workspaceId/leave',
      params: { workspaceId },
    });

    return response.status === HttpCode.OK;
  }
}
