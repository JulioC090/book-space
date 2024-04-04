import Workspace from 'domain/models/Workspace';
import ILoadWorkspacesRepository from 'infra/protocols/repositories/ILoadWorkspacesRepository';

export default class LoadWorkspaces {
  private loadWorkspacesRepository: ILoadWorkspacesRepository;

  constructor(loadWorkspacesRepository: ILoadWorkspacesRepository) {
    this.loadWorkspacesRepository = loadWorkspacesRepository;
  }

  async load(userId: string): Promise<Array<Workspace>> {
    const workspaces = await this.loadWorkspacesRepository.load(userId);
    return workspaces.map((workspace) => ({
      ...workspace,
      role: workspace.ownerId === userId ? 'OWNER' : 'DEFAULT',
    }));
  }
}
