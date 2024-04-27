import IWorkspaceResourceGateway from '@/infra/protocols/gateways/IWorkspaceResourceGateway';
import { IWorkspaceResourceService } from '@/infra/protocols/services/IWorkspaceResourceService';
import { Resource } from '@/models/Resource';

export default class WorkspaceResourceService
  implements IWorkspaceResourceService
{
  private resourceGateway: IWorkspaceResourceGateway;

  constructor(resourceGateway: IWorkspaceResourceGateway) {
    this.resourceGateway = resourceGateway;
  }

  async add(workspaceId: string, name: string): Promise<Resource | null> {
    const response = await this.resourceGateway.add(workspaceId, name);
    if (!response) return null;
    return response;
  }

  async remove(workspaceId: string, resourceId: string): Promise<boolean> {
    return await this.resourceGateway.remove(workspaceId, resourceId);
  }
}
