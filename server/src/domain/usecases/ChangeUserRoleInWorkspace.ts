import { User } from 'domain/models/User';
import { UserRole } from 'domain/models/UserRole';
import IChangeUserRoleRepository from 'infra/protocols/repositories/IChangeUserRoleRepository';
import ICheckUserExistInWorkspaceRepository from 'infra/protocols/repositories/ICheckUserExistInWorkspaceRepository';
import { ILoadAccountByEmailRepository } from 'infra/protocols/repositories/ILoadAccountByEmailRepository';
import ILoadWorkspaceById from 'infra/protocols/repositories/ILoadWorkspaceById';

export default class ChangeUserRoleInWorkspace {
  private loadWorkspaceByIdRepository: ILoadWorkspaceById;
  private loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository;
  private changeUserRoleRepository: IChangeUserRoleRepository;

  constructor(
    loadWorkspaceByIdRepository: ILoadWorkspaceById,
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository,
    changeUserRoleRepository: IChangeUserRoleRepository,
  ) {
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
    if (workspace.ownerId !== authenticatedUser.id) return false;

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
