import Workspace from 'domain/models/Workspace';
import IUpdateWorkspaceRepository from 'infra/protocols/repositories/IUpdateWorkspaceRepository';

export default class UpdateWorkspace {
  private updateWorkspaceRepository: IUpdateWorkspaceRepository;

  constructor(updateWorkspaceRepository: IUpdateWorkspaceRepository) {
    this.updateWorkspaceRepository = updateWorkspaceRepository;
  }

  update(
    userId: string,
    workspaceId: string,
    partialWorkspace: Partial<Omit<Workspace, 'id'>>,
  ): Promise<boolean> {
    return this.updateWorkspaceRepository.update(
      userId,
      workspaceId,
      partialWorkspace,
    );
  }
}
