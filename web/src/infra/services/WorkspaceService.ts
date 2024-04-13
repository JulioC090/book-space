import IAddWorkspaceGateway from '@/infra/protocols/gateways/IAddWorkspaceGateway';
import IDeleteWorkspaceGateway from '@/infra/protocols/gateways/IDeleteWorkspaceGateway';
import ILoadWorkspaceDetailsGateway from '@/infra/protocols/gateways/ILoadWorkspaceDetailsGateway';
import ILoadWorkspaceGateway from '@/infra/protocols/gateways/ILoadWorkspaceGateway';
import IUpdateWorkspaceGateway from '@/infra/protocols/gateways/IUpdateWorkspaceGateway';
import IWorkspaceService from '@/infra/protocols/services/IWorkspaceService';
import { Workspace } from '@/models/Workspace';

export default class WorkspaceService implements IWorkspaceService {
  private loadAllWorkspacesGateway: ILoadWorkspaceGateway;
  private loadWorkspaceGateway: ILoadWorkspaceDetailsGateway;
  private addWorkspaceGateway: IAddWorkspaceGateway;
  private updateWorkspaceGateway: IUpdateWorkspaceGateway;
  private deleteWorkspaceGateway: IDeleteWorkspaceGateway;

  constructor(
    loadAllWorkspacesGateway: ILoadWorkspaceGateway,
    loadWorkspaceGateway: ILoadWorkspaceDetailsGateway,
    addWorkspaceGateway: IAddWorkspaceGateway,
    updateWorkspaceGateway: IUpdateWorkspaceGateway,
    deleteWorkspaceGateway: IDeleteWorkspaceGateway,
  ) {
    this.loadAllWorkspacesGateway = loadAllWorkspacesGateway;
    this.loadWorkspaceGateway = loadWorkspaceGateway;
    this.addWorkspaceGateway = addWorkspaceGateway;
    this.updateWorkspaceGateway = updateWorkspaceGateway;
    this.deleteWorkspaceGateway = deleteWorkspaceGateway;
  }

  async loadAll(): Promise<Workspace[]> {
    return await this.loadAllWorkspacesGateway.load();
  }

  async load(workspaceId: string): Promise<Required<Workspace> | undefined> {
    return await this.loadWorkspaceGateway.loadWorkspaceDetails(workspaceId);
  }

  async add(
    workspace: Omit<Workspace, 'id' | 'role'>,
  ): Promise<string | undefined> {
    const gatewayResponse = await this.addWorkspaceGateway.add(workspace);
    if (!gatewayResponse) return undefined;
    return gatewayResponse?.workspaceId;
  }

  async update(
    workspaceId: string,
    partialWorkspace: Omit<Workspace, 'id' | 'role'>,
  ): Promise<boolean> {
    return await this.updateWorkspaceGateway.update(
      workspaceId,
      partialWorkspace,
    );
  }

  async delete(workspaceId: string): Promise<boolean> {
    return await this.deleteWorkspaceGateway.delete(workspaceId);
  }
}
