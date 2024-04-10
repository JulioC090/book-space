import { Permission } from 'domain/models/Permission';
import { User } from 'domain/models/User';
import { UserRole } from 'domain/models/UserRole';
import can from 'domain/utils/permissionResolver';
import IChangeUserRoleRepository from 'infra/protocols/repositories/IChangeUserRoleRepository';
import ICheckUserExistInWorkspaceRepository from 'infra/protocols/repositories/ICheckUserExistInWorkspaceRepository';
import { ILoadAccountByEmailRepository } from 'infra/protocols/repositories/ILoadAccountByEmailRepository';
import ILoadUserRoleRepository from 'infra/protocols/repositories/ILoadUserRoleRepository';
import ILoadWorkspaceById from 'infra/protocols/repositories/ILoadWorkspaceById';

export default class ChangeUserRoleInWorkspace {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private loadWorkspaceByIdRepository: ILoadWorkspaceById;
  private loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository;
  private changeUserRoleRepository: IChangeUserRoleRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    loadWorkspaceByIdRepository: ILoadWorkspaceById,
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository,
    changeUserRoleRepository: IChangeUserRoleRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.loadWorkspaceByIdRepository = loadWorkspaceByIdRepository;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.checkUserExistInWorkspaceRepository =
      checkUserExistInWorkspaceRepository;
    this.changeUserRoleRepository = changeUserRoleRepository;
  }

  async changeRole(
    authenticatedUser: User,
    workspaceId: string,
    user: { email: string; role: UserRole },
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
    if (!can(authenticatedUserRole, Permission.UPDATE_USER_ROLE)) return false;

    const changedUser = await this.loadAccountByEmailRepository.loadByEmail(
      user.email,
    );
    if (!changedUser) return false;

    const isInWorkspace =
      await this.checkUserExistInWorkspaceRepository.checkUserInWorkspace(
        workspaceId,
        changedUser.id,
      );
    if (!isInWorkspace) return false;

    return await this.changeUserRoleRepository.changeRole(workspace.id, {
      userId: changedUser.id,
      role: user.role,
    });
  }
}
