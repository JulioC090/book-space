import IDeleteWorkspaceRepository from 'infra/protocols/repositories/IDeleteWorkspaceRepository';
import ILoadWorkspaceById from 'infra/protocols/repositories/ILoadWorkspaceById';

export default class DeleteWorkspace {
  private loadWorkspaceById: ILoadWorkspaceById;
  private deleteWorkspaceRepository: IDeleteWorkspaceRepository;

  constructor(
    loadWorkspaceById: ILoadWorkspaceById,
    deleteWorkspaceRepository: IDeleteWorkspaceRepository,
  ) {
    this.loadWorkspaceById = loadWorkspaceById;
    this.deleteWorkspaceRepository = deleteWorkspaceRepository;
  }

  async delete(userId: string, workspaceId: string): Promise<boolean> {
    const workspace = await this.loadWorkspaceById.loadById(workspaceId);
    if (!workspace) return false;
    if (workspace.ownerId !== userId) return false;

    return this.deleteWorkspaceRepository.delete(userId, workspaceId);
  }
}
