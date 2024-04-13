import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { workspaceRolesPermissions } from '@/domain/models/WorkspaceRolesPermissions';
import ILoadUserRoleRepository from '@/infra/protocols/repositories/ILoadUserRoleRepository';
import IDeleteWorkspaceRepository from 'infra/protocols/repositories/IDeleteWorkspaceRepository';

export default class DeleteWorkspace {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private deleteWorkspaceRepository: IDeleteWorkspaceRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    deleteWorkspaceRepository: IDeleteWorkspaceRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.deleteWorkspaceRepository = deleteWorkspaceRepository;
  }

  async delete(
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
        WorkspacePermissions.DELETE_WORKSPACE,
      )
    )
      return false;

    return this.deleteWorkspaceRepository.delete(workspaceId);
  }
}
