import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { workspaceRolesPermissions } from '@/domain/models/WorkspaceRolesPermissions';
import IDeleteWorkspaceResource from '@/domain/protocols/usecases/IDeleteWorkspaceResource';
import IDeleteWorkspaceResourceRepository from '@/infra/protocols/repositories/IDeleteWorkspaceResourceRepository';
import ILoadUserRoleRepository from '@/infra/protocols/repositories/ILoadUserRoleRepository';

export default class DeleteWorkspaceResource
  implements IDeleteWorkspaceResource
{
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private deleteWorkspaceResourceRepository: IDeleteWorkspaceResourceRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    deleteWorkspaceResourceRepository: IDeleteWorkspaceResourceRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.deleteWorkspaceResourceRepository = deleteWorkspaceResourceRepository;
  }

  async delete(
    authenticatedUserId: string,
    workspaceId: string,
    resourceId: string,
  ): Promise<boolean> {
    const userRole = await this.loadUserRoleRepository.loadUserRole(
      authenticatedUserId,
      workspaceId,
    );
    if (!userRole) return false;

    if (
      !workspaceRolesPermissions[userRole].can(
        WorkspacePermissions.UPDATE_SPACE,
      )
    )
      return false;

    return await this.deleteWorkspaceResourceRepository.delete(resourceId);
  }
}
