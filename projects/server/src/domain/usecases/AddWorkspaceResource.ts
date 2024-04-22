import Resource from '@/domain/models/Resource';
import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { workspaceRolesPermissions } from '@/domain/models/WorkspaceRolesPermissions';
import IAddWorkspaceResource from '@/domain/protocols/usecases/IAddWorkspaceResource';
import IAddWorkspaceResourceRepository from '@/infra/protocols/repositories/IAddWorkspaceResourceRepository';
import ICheckResourceNameRepository from '@/infra/protocols/repositories/ICheckResourceNameRepository';
import ILoadUserRoleRepository from '@/infra/protocols/repositories/ILoadUserRoleRepository';

export default class AddWorkspaceResource implements IAddWorkspaceResource {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private checkResourceNameRepository: ICheckResourceNameRepository;
  private addWorkspaceResourceRepository: IAddWorkspaceResourceRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    checkResourceNameRepository: ICheckResourceNameRepository,
    addWorkspaceResourceRepository: IAddWorkspaceResourceRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.checkResourceNameRepository = checkResourceNameRepository;
    this.addWorkspaceResourceRepository = addWorkspaceResourceRepository;
  }

  async add(
    authenticatedUserId: string,
    workspaceId: string,
    resource: Omit<Resource, 'id'>,
  ): Promise<Resource | null> {
    const userRole = await this.loadUserRoleRepository.loadUserRole(
      authenticatedUserId,
      workspaceId,
    );
    if (!userRole) return null;

    if (
      !workspaceRolesPermissions[userRole].can(
        WorkspacePermissions.ADD_SPACE_TO_WORKSPACE,
      )
    )
      return null;

    if (
      await this.checkResourceNameRepository.checkName(
        workspaceId,
        resource.name,
      )
    )
      return null;

    const addResource = await this.addWorkspaceResourceRepository.add(
      workspaceId,
      resource,
    );
    if (!addResource) return null;
    return addResource;
  }
}
