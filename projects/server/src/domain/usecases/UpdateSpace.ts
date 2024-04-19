import Space from '@/domain/models/Space';
import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { workspaceRolesPermissions } from '@/domain/models/WorkspaceRolesPermissions';
import IUpdateSpace from '@/domain/protocols/usecases/IUpdateSpace';
import ICheckSpaceIsInWorkspaceRepository from '@/infra/protocols/repositories/ICheckSpaceIsInWorkspaceRepository';
import ILoadUserRoleRepository from '@/infra/protocols/repositories/ILoadUserRoleRepository';
import IUpdateSpaceRepository from '@/infra/protocols/repositories/IUpdateSpaceRepository';

export default class UpdateSpace implements IUpdateSpace {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private checkSpaceIsInWorkspaceRepository: ICheckSpaceIsInWorkspaceRepository;
  private updateSpaceRepository: IUpdateSpaceRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    checkSpaceIsInWorkspaceRepository: ICheckSpaceIsInWorkspaceRepository,
    updateSpaceRepository: IUpdateSpaceRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.checkSpaceIsInWorkspaceRepository = checkSpaceIsInWorkspaceRepository;
    this.updateSpaceRepository = updateSpaceRepository;
  }

  async update(
    authenticatedUserId: string,
    workspaceId: string,
    spaceId: string,
    partialSpace: Partial<Omit<Space, 'id' | 'workspaceId'>>,
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

    if (
      !(await this.checkSpaceIsInWorkspaceRepository.isInWorkspace(
        workspaceId,
        spaceId,
      ))
    )
      return false;

    return await this.updateSpaceRepository.update(spaceId, partialSpace);
  }
}
