import IAddWorkspaceGateway from '@/infra/protocols/gateways/IAddWorkspaceGateway';
import IHttpClient from '@/infra/protocols/http/IHttpClient';
import { Workspace } from '@/models/Workspace';

export default class WorkspaceGateway implements IAddWorkspaceGateway {
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
}
