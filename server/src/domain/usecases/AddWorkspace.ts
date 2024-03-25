import Workspace from 'domain/models/Workspace';
import IAddWorkspaceRepository from 'infra/protocols/repositories/IAddWorkspaceRepository';

export default class AddWorkspace {
  private addWorkspaceRepository: IAddWorkspaceRepository;

  constructor(addWorkspaceRepository: IAddWorkspaceRepository) {
    this.addWorkspaceRepository = addWorkspaceRepository;
  }

  async add(workspace: Omit<Workspace, 'id'>): Promise<boolean> {
    return this.addWorkspaceRepository.add(workspace);
  }
}
