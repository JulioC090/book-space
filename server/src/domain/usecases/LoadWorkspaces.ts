import ILoadWorkspacesRepository, {
  ILoadWorkspacesRepositoryOutput,
} from 'infra/protocols/repositories/ILoadWorkspacesRepository';

export default class LoadWorkspaces {
  private loadWorkspacesRepository: ILoadWorkspacesRepository;

  constructor(loadWorkspacesRepository: ILoadWorkspacesRepository) {
    this.loadWorkspacesRepository = loadWorkspacesRepository;
  }

  async load(userId: string): Promise<ILoadWorkspacesRepositoryOutput> {
    return await this.loadWorkspacesRepository.load(userId);
  }
}
