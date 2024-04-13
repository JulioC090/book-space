import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { workspaceRolesPermissions } from '@/domain/models/WorkspaceRolesPermissions';
import IDeleteUserInWorkspaceRepository from '@/infra/protocols/repositories/IDeleteUserInWorkspaceRepository';
import ILoadUserRoleRepository from '@/infra/protocols/repositories/ILoadUserRoleRepository';

export default class LeaveWorkspace {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private deleteUserInWorkspaceRepository: IDeleteUserInWorkspaceRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    deleteUserInWorkspaceRepository: IDeleteUserInWorkspaceRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.deleteUserInWorkspaceRepository = deleteUserInWorkspaceRepository;
  }

  async leave(
    authenticatedUserId: string,
    workspaceId: string,
  ): Promise<boolean> {
    const authenticatedUserRole =
      await this.loadUserRoleRepository.loadUserRole(
        authenticatedUserId,
        workspaceId,
      );
    if (!authenticatedUserRole) return false;

    if (
      !workspaceRolesPermissions[authenticatedUserRole].can(
        WorkspacePermissions.LEAVE_WORKSPACE,
      )
    )
      return false;

    return await this.deleteUserInWorkspaceRepository.deleteUserInWorkspace(
      workspaceId,
      authenticatedUserId,
    );
  }
}
