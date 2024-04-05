import Workspace from 'domain/models/Workspace';
import ICheckUserExistInWorkspaceRepository from 'infra/protocols/repositories/ICheckUserExistInWorkspaceRepository';
import ILoadWorkspaceDetailsRepository from 'infra/protocols/repositories/ILoadWorkspaceDetailsRepository';

export default class LoadWorkspaceDetails {
  private checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository;
  private loadWorkspaceDetailsRepository: ILoadWorkspaceDetailsRepository;

  constructor(
    checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository,
    loadWorkspaceDetailsRepository: ILoadWorkspaceDetailsRepository,
  ) {
    this.checkUserExistInWorkspaceRepository =
      checkUserExistInWorkspaceRepository;
    this.loadWorkspaceDetailsRepository = loadWorkspaceDetailsRepository;
  }

  async loadWorkspaceDetails(
    authenticatedUserId: string,
    workspaceId: string,
  ): Promise<Required<Workspace> | null> {
    const isUserInWorkspace =
      await this.checkUserExistInWorkspaceRepository.checkUserInWorkspace(
        workspaceId,
        authenticatedUserId,
      );

    if (!isUserInWorkspace) return null;

    const workspace =
      await this.loadWorkspaceDetailsRepository.loadWorkspaceDetails(
        workspaceId,
      );

    if (!workspace) return null;

    return {
      ...workspace,
      role: workspace.ownerId === authenticatedUserId ? 'OWNER' : 'DEFAULT',
    };
  }
}
