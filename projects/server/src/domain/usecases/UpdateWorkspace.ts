import Workspace from '@/domain/models/Workspace';
import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { workspaceRolesPermissions } from '@/domain/models/WorkspaceRolesPermissions';
import ILoadUserRoleRepository from '@/infra/protocols/repositories/ILoadUserRoleRepository';
import IUpdateWorkspaceRepository from '@/infra/protocols/repositories/IUpdateWorkspaceRepository';

export default class UpdateWorkspace {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private updateWorkspaceRepository: IUpdateWorkspaceRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    updateWorkspaceRepository: IUpdateWorkspaceRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.updateWorkspaceRepository = updateWorkspaceRepository;
  }

  async update(
    authenticatedUserId: string,
    workspaceId: string,
    partialWorkspace: Partial<Omit<Workspace, 'id'>>,
  ): Promise<boolean> {
    const authenticatedUserRole =
      await this.loadUserRoleRepository.loadUserRole(
        authenticatedUserId,
        workspaceId,
      );
    if (!authenticatedUserRole) return false;
    if (
      !workspaceRolesPermissions[authenticatedUserRole].can(
        WorkspacePermissions.UPDATE_WORKSPACE,
      )
    )
      return false;

    return this.updateWorkspaceRepository.update(workspaceId, partialWorkspace);
  }
}
