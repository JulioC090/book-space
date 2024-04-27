import IWorkspaceResourceGateway from '@/infra/protocols/gateways/IWorkspaceResourceGateway';
import IHttpClient from '@/infra/protocols/http/IHttpClient';
import { HttpCode } from '@/infra/protocols/http/httpCodes';
import { Resource } from '@/models/Resource';

export default class WorkspaceResourceGateway
  implements IWorkspaceResourceGateway
{
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async add(workspaceId: string, name: string): Promise<Resource | null> {
    const response = await this.httpClient.post({
      url: '/workspace/:workspaceId/resource',
      params: { workspaceId },
      body: { name },
    });
    if (response.status !== HttpCode.CREATED) return null;
    return response.body!;
  }

  async remove(workspaceId: string, resourceId: string): Promise<boolean> {
    const response = await this.httpClient.delete({
      url: '/workspace/:workspaceId/resource/:resourceId',
      params: {
        workspaceId,
        resourceId,
      },
    });
    return response.status === HttpCode.OK;
  }
}
