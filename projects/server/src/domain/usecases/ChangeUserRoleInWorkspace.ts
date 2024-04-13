import { User } from '@/domain/models/User';
import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import { workspaceRolesPermissions } from '@/domain/models/WorkspaceRolesPermissions';
import IChangeUserRoleRepository from '@/infra/protocols/repositories/IChangeUserRoleRepository';
import { ILoadAccountByEmailRepository } from '@/infra/protocols/repositories/ILoadAccountByEmailRepository';
import ILoadUserRoleRepository from '@/infra/protocols/repositories/ILoadUserRoleRepository';
import ILoadWorkspaceById from '@/infra/protocols/repositories/ILoadWorkspaceById';

export default class ChangeUserRoleInWorkspace {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private loadWorkspaceByIdRepository: ILoadWorkspaceById;
  private loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private changeUserRoleRepository: IChangeUserRoleRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    loadWorkspaceByIdRepository: ILoadWorkspaceById,
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    changeUserRoleRepository: IChangeUserRoleRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.loadWorkspaceByIdRepository = loadWorkspaceByIdRepository;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.changeUserRoleRepository = changeUserRoleRepository;
  }

  async changeRole(
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

    return await this.changeUserRoleRepository.changeRole(workspace.id, {
      userId: changedUser.id,
      role: user.role,
    });
  }
}
