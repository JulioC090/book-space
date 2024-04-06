import ICheckUserExistInWorkspaceRepository from 'infra/protocols/repositories/ICheckUserExistInWorkspaceRepository';
import IDeleteUserInWorkspaceRepository from 'infra/protocols/repositories/IDeleteUserInWorkspaceRepository';
import ILoadWorkspaceById from 'infra/protocols/repositories/ILoadWorkspaceById';

export default class LeaveWorkspace {
  private checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository;
  private loadWorkspaceById: ILoadWorkspaceById;
  private deleteUserInWorkspaceRepository: IDeleteUserInWorkspaceRepository;

  constructor(
    checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository,
    loadWorkspaceById: ILoadWorkspaceById,
    deleteUserInWorkspaceRepository: IDeleteUserInWorkspaceRepository,
  ) {
    this.checkUserExistInWorkspaceRepository =
      checkUserExistInWorkspaceRepository;
    this.loadWorkspaceById = loadWorkspaceById;
    this.deleteUserInWorkspaceRepository = deleteUserInWorkspaceRepository;
  }

  async leave(
    authenticatedUserId: string,
    workspaceId: string,
  ): Promise<boolean> {
    const isInWorkspace =
      await this.checkUserExistInWorkspaceRepository.checkUserInWorkspace(
        workspaceId,
        authenticatedUserId,
      );
    if (!isInWorkspace) return false;

    const workspace = await this.loadWorkspaceById.loadById(workspaceId);
    if (workspace?.ownerId === authenticatedUserId) return false;

    return await this.deleteUserInWorkspaceRepository.deleteUserInWorkspace(
      workspaceId,
      authenticatedUserId,
    );
  }
}
