import Workspace from 'domain/models/Workspace';
import ICheckUserExistInWorkspaceRepository from 'infra/protocols/repositories/ICheckUserExistInWorkspaceRepository';
import ILoadUserRoleRepository from 'infra/protocols/repositories/ILoadUserRoleRepository';
import ILoadWorkspaceDetailsRepository from 'infra/protocols/repositories/ILoadWorkspaceDetailsRepository';

export default class LoadWorkspaceDetails {
  private checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository;
  private loadWorkspaceDetailsRepository: ILoadWorkspaceDetailsRepository;
  private loadUserRoleRepository: ILoadUserRoleRepository;

  constructor(
    checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository,
    loadWorkspaceDetailsRepository: ILoadWorkspaceDetailsRepository,
    loadUserRoleRepository: ILoadUserRoleRepository,
  ) {
    this.checkUserExistInWorkspaceRepository =
      checkUserExistInWorkspaceRepository;
    this.loadWorkspaceDetailsRepository = loadWorkspaceDetailsRepository;
    this.loadUserRoleRepository = loadUserRoleRepository;
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

    const role = await this.loadUserRoleRepository.loadUserRole(
      authenticatedUserId,
      workspaceId,
    );
    if (!role) return null;

    return {
      ...workspace,
      role,
    };
  }
}
