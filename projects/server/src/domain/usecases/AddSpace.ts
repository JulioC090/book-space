import Space from '@/domain/models/Space';
import { User } from '@/domain/models/User';
import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { workspaceRolesPermissions } from '@/domain/models/WorkspaceRolesPermissions';
import IAddSpaceRepository from '@/infra/protocols/repositories/IAddSpaceRepository';
import ILoadUserRoleRepository from '@/infra/protocols/repositories/ILoadUserRoleRepository';

export default class AddSpace {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private addSpaceRepository: IAddSpaceRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    addSpaceRepository: IAddSpaceRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.addSpaceRepository = addSpaceRepository;
  }

  async add(
    authenticatedUser: User,
    workspaceId: string,
    space: Omit<Space, 'id'>,
    resources?: Array<string>,
  ): Promise<Space | null> {
    const userRole = await this.loadUserRoleRepository.loadUserRole(
      authenticatedUser.id,
      workspaceId,
    );
    if (!userRole) return null;

    if (
      !workspaceRolesPermissions[userRole].can(
        WorkspacePermissions.ADD_SPACE_TO_WORKSPACE,
      )
    )
      return null;

    const addedSpace = await this.addSpaceRepository.add(
      workspaceId,
      space,
      resources,
    );
    if (!addedSpace) return null;

    return addedSpace;
  }
}
