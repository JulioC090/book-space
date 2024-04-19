import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { workspaceRolesPermissions } from '@/domain/models/WorkspaceRolesPermissions';
import IDeleteSpace from '@/domain/protocols/usecases/IDeleteSpace';
import ICheckSpaceIsInWorkspaceRepository from '@/infra/protocols/repositories/ICheckSpaceIsInWorkspaceRepository';
import IDeleteSpaceRepository from '@/infra/protocols/repositories/IDeleteSpaceRepository';
import ILoadUserRoleRepository from '@/infra/protocols/repositories/ILoadUserRoleRepository';

export default class DeleteSpace implements IDeleteSpace {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private checkSpaceIsInWorkspaceRepository: ICheckSpaceIsInWorkspaceRepository;
  private deleteSpaceRepository: IDeleteSpaceRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    checkSpaceIsInWorkspaceRepository: ICheckSpaceIsInWorkspaceRepository,
    deleteSpaceRepository: IDeleteSpaceRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.checkSpaceIsInWorkspaceRepository = checkSpaceIsInWorkspaceRepository;
    this.deleteSpaceRepository = deleteSpaceRepository;
  }

  async delete(
    authenticatedUserId: string,
    workspaceId: string,
    spaceId: string,
  ): Promise<boolean> {
    const userRole = await this.loadUserRoleRepository.loadUserRole(
      authenticatedUserId,
      workspaceId,
    );
    if (!userRole) return false;

    if (
      !workspaceRolesPermissions[userRole].can(
        WorkspacePermissions.DELETE_SPACE_FROM_WORKSPACE,
      )
    )
      return false;

    if (
      !(await this.checkSpaceIsInWorkspaceRepository.isInWorkspace(
        workspaceId,
        spaceId,
      ))
    )
      return false;

    return await this.deleteSpaceRepository.delete(spaceId);
  }
}
