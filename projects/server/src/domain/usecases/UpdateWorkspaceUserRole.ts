import { User } from '@/domain/models/User';
import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import { workspaceRolesPermissions } from '@/domain/models/WorkspaceRolesPermissions';
import { ILoadAccountByEmailRepository } from '@/infra/protocols/repositories/ILoadAccountByEmailRepository';
import ILoadUserRoleRepository from '@/infra/protocols/repositories/ILoadUserRoleRepository';
import ILoadWorkspaceById from '@/infra/protocols/repositories/ILoadWorkspaceById';
import IUpdateWorkspaceUserRoleRepository from '@/infra/protocols/repositories/IUpdateWorkspaceUserRoleRepository';

export default class UpdateWorkspaceUserRole {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private loadWorkspaceByIdRepository: ILoadWorkspaceById;
  private loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private updateWorkspaceUserRoleRepository: IUpdateWorkspaceUserRoleRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    loadWorkspaceByIdRepository: ILoadWorkspaceById,
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    updateWorkspaceUserRoleRepository: IUpdateWorkspaceUserRoleRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.loadWorkspaceByIdRepository = loadWorkspaceByIdRepository;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.updateWorkspaceUserRoleRepository = updateWorkspaceUserRoleRepository;
  }

  async updateUserRole(
    authenticatedUser: Omit<User, 'password'>,
    workspaceId: string,
    user: { email: string; role: WorkspaceRoles },
  ): Promise<boolean> {
    const workspace =
      await this.loadWorkspaceByIdRepository.loadById(workspaceId);
    if (!workspace) return false;

    const authenticatedUserRole =
      await this.loadUserRoleRepository.loadUserRole(
        authenticatedUser.id,
        workspaceId,
      );
    if (!authenticatedUserRole) return false;
    if (
      !workspaceRolesPermissions[authenticatedUserRole].can(
        WorkspacePermissions.UPDATE_USER_ROLE,
      )
    )
      return false;

    if (
      !workspaceRolesPermissions[authenticatedUserRole].isAbove(
        workspaceRolesPermissions[user.role],
      )
    )
      return false;

    const changedUser = await this.loadAccountByEmailRepository.loadByEmail(
      user.email,
    );
    if (!changedUser) return false;

    const changedUserRole = await this.loadUserRoleRepository.loadUserRole(
      changedUser.id,
      workspaceId,
    );
    if (!changedUserRole) return false;

    if (
      !workspaceRolesPermissions[authenticatedUserRole].isAbove(
        workspaceRolesPermissions[changedUserRole],
      )
    )
      return false;

    return await this.updateWorkspaceUserRoleRepository.updateUserRole(
      workspace.id,
      {
        userId: changedUser.id,
        role: user.role,
      },
    );
  }
}
