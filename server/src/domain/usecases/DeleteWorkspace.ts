import IDeleteWorkspaceRepository from 'infra/protocols/repositories/IDeleteWorkspaceRepository';

export default class DeleteWorkspace {
  private deleteWorkspaceRepository: IDeleteWorkspaceRepository;

  constructor(deleteWorkspaceRepository: IDeleteWorkspaceRepository) {
    this.deleteWorkspaceRepository = deleteWorkspaceRepository;
  }

  async delete(workspaceId: string): Promise<boolean> {
    return this.deleteWorkspaceRepository.delete(workspaceId);
  }
}
