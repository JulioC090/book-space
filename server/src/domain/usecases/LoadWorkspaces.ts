import Workspace from 'domain/models/Workspace';
import ILoadWorkspacesRepository from 'infra/protocols/repositories/ILoadWorkspacesRepository';

export default class LoadWorkspaces {
  private loadWorkspacesRepository: ILoadWorkspacesRepository;

  constructor(loadWorkspacesRepository: ILoadWorkspacesRepository) {
    this.loadWorkspacesRepository = loadWorkspacesRepository;
  }

  async load(userId: string): Promise<Array<Workspace>> {
    return await this.loadWorkspacesRepository.load(userId);
  }
}
