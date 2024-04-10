import { Permission } from 'domain/models/Permission';
import { User } from 'domain/models/User';
import can from 'domain/utils/permissionResolver';
import ICheckUserExistInWorkspaceRepository from 'infra/protocols/repositories/ICheckUserExistInWorkspaceRepository';
import IDeleteUserInWorkspaceRepository from 'infra/protocols/repositories/IDeleteUserInWorkspaceRepository';
import { ILoadAccountByEmailRepository } from 'infra/protocols/repositories/ILoadAccountByEmailRepository';
import ILoadUserRoleRepository from 'infra/protocols/repositories/ILoadUserRoleRepository';
import ILoadWorkspaceById from 'infra/protocols/repositories/ILoadWorkspaceById';

export default class DeleteUserInWorkspace {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private loadWorkspaceByIdRepository: ILoadWorkspaceById;
  private checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository;
  private loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private deleteUserInWorkspaceRepository: IDeleteUserInWorkspaceRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    loadWorkspaceByIdRepository: ILoadWorkspaceById,
    checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository,
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    deleteUserInWorkspaceRepository: IDeleteUserInWorkspaceRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.loadWorkspaceByIdRepository = loadWorkspaceByIdRepository;
    this.checkUserExistInWorkspaceRepository =
      checkUserExistInWorkspaceRepository;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.deleteUserInWorkspaceRepository = deleteUserInWorkspaceRepository;
  }

  async deleteUserInWorkspace(
    authenticatedUser: User,
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
    if (!can(authenticatedUserRole, Permission.REMOVE_USER_FROM_WORKSPACE))
      return false;

    const removedUser =
      await this.loadAccountByEmailRepository.loadByEmail(userEmail);
    if (!removedUser) return false;

    const existInWorkspace =
      await this.checkUserExistInWorkspaceRepository.checkUserInWorkspace(
        workspaceId,
        removedUser.id,
      );
    if (!existInWorkspace) return false;

    return await this.deleteUserInWorkspaceRepository.deleteUserInWorkspace(
      workspaceId,
      removedUser.id,
    );
  }
}
