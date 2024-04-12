import { User } from '@/domain/models/User';
import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { workspaceRolesPermissions } from '@/domain/models/WorkspaceRolesPermissions';
import IDeleteUserInWorkspaceRepository from '@/infra/protocols/repositories/IDeleteUserInWorkspaceRepository';
import { ILoadAccountByEmailRepository } from '@/infra/protocols/repositories/ILoadAccountByEmailRepository';
import ILoadUserRoleRepository from '@/infra/protocols/repositories/ILoadUserRoleRepository';
import ILoadWorkspaceById from '@/infra/protocols/repositories/ILoadWorkspaceById';

export default class DeleteUserInWorkspace {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private loadWorkspaceByIdRepository: ILoadWorkspaceById;
  private loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private deleteUserInWorkspaceRepository: IDeleteUserInWorkspaceRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    loadWorkspaceByIdRepository: ILoadWorkspaceById,
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    deleteUserInWorkspaceRepository: IDeleteUserInWorkspaceRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.loadWorkspaceByIdRepository = loadWorkspaceByIdRepository;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.deleteUserInWorkspaceRepository = deleteUserInWorkspaceRepository;
  }

  async deleteUserInWorkspace(
    authenticatedUser: Omit<User, 'password'>,
    workspaceId: string,
    userEmail: string,
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
        WorkspacePermissions.REMOVE_USER_FROM_WORKSPACE,
      )
    )
      return false;

    const removedUser =
      await this.loadAccountByEmailRepository.loadByEmail(userEmail);
    if (!removedUser) return false;

    const removedUserRole = await this.loadUserRoleRepository.loadUserRole(
      removedUser.id,
      workspaceId,
    );
    if (!removedUserRole) return false;

    if (
      !workspaceRolesPermissions[authenticatedUserRole].isAbove(
        workspaceRolesPermissions[removedUserRole],
      )
    )
      return false;

    return await this.deleteUserInWorkspaceRepository.deleteUserInWorkspace(
      workspaceId,
      removedUser.id,
    );
  }
}
