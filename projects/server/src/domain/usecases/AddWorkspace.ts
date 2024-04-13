import Workspace from 'domain/models/Workspace';
import IAddWorkspaceRepository, {
  IAddWorkspaceRepositoryOutput,
} from 'infra/protocols/repositories/IAddWorkspaceRepository';

export default class AddWorkspace {
  private addWorkspaceRepository: IAddWorkspaceRepository;

  constructor(addWorkspaceRepository: IAddWorkspaceRepository) {
    this.addWorkspaceRepository = addWorkspaceRepository;
  }

  async add(
    workspace: Omit<Workspace, 'id'>,
  ): Promise<IAddWorkspaceRepositoryOutput> {
    return await this.addWorkspaceRepository.add(workspace);
  }
}
