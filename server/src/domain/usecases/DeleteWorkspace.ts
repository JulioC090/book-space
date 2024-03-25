import IDeleteWorkspaceRepository from 'infra/protocols/repositories/IDeleteWorkspaceRepository';

export default class DeleteWorkspace {
  private deleteWorkspaceRepository: IDeleteWorkspaceRepository;

  constructor(deleteWorkspaceRepository: IDeleteWorkspaceRepository) {
    this.deleteWorkspaceRepository = deleteWorkspaceRepository;
  }

  async delete(userId: string, workspaceId: string): Promise<boolean> {
    return this.deleteWorkspaceRepository.delete(userId, workspaceId);
  }
}
