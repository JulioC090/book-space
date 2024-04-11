import { User } from '@/domain/models/User';
import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import { workspaceRolesPermissions } from '@/domain/models/WorkspaceRolesPermissions';
import IAddUserToWorkspaceRepository from '@/infra/protocols/repositories/IAddUserToWorkspaceRepository';
import ICheckUserExistInWorkspaceRepository from '@/infra/protocols/repositories/ICheckUserExistInWorkspaceRepository';
import { ILoadAccountByEmailRepository } from '@/infra/protocols/repositories/ILoadAccountByEmailRepository';
import ILoadUserRoleRepository from '@/infra/protocols/repositories/ILoadUserRoleRepository';
import ILoadWorkspaceById from '@/infra/protocols/repositories/ILoadWorkspaceById';

export default class AddUserToWorkspace {
  private loadUserRoleRepository: ILoadUserRoleRepository;
  private loadWorkspaceByIdRepository: ILoadWorkspaceById;
  private loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository;
  private addUserToWorkspaceRepository: IAddUserToWorkspaceRepository;

  constructor(
    loadUserRoleRepository: ILoadUserRoleRepository,
    loadWorkspaceByIdRepository: ILoadWorkspaceById,
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository,
    addUserToWorkspaceRepository: IAddUserToWorkspaceRepository,
  ) {
    this.loadUserRoleRepository = loadUserRoleRepository;
    this.loadWorkspaceByIdRepository = loadWorkspaceByIdRepository;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.checkUserExistInWorkspaceRepository =
      checkUserExistInWorkspaceRepository;
    this.addUserToWorkspaceRepository = addUserToWorkspaceRepository;
  }

  async addUserToWorkspace(
    authenticatedUser: Omit<User, 'password'>,
    workspaceId: string,
    user: { email: string; role: WorkspaceRoles },
  ): Promise<{ id: string; name: string; email: string } | null> {
    const workspace =
      await this.loadWorkspaceByIdRepository.loadById(workspaceId);

    if (!workspace) return null;
    if (user.email === authenticatedUser.email) return null;

    const authenticatedUserRole =
      await this.loadUserRoleRepository.loadUserRole(
        authenticatedUser.id,
        workspaceId,
      );

    if (!authenticatedUserRole) return null;
    if (
      !workspaceRolesPermissions[authenticatedUserRole].can(
        WorkspacePermissions.ADD_USER_TO_WORKSPACE,
      )
    )
      return null;

    if (
      !workspaceRolesPermissions[authenticatedUserRole].isAbove(
        workspaceRolesPermissions[user.role],
      )
    )
      return null;

    const addedUser = await this.loadAccountByEmailRepository.loadByEmail(
      user.email,
    );
    if (!addedUser) return null;

    const existInWorkspace =
      await this.checkUserExistInWorkspaceRepository.checkUserInWorkspace(
        workspaceId,
        addedUser.id,
      );
    if (existInWorkspace) return null;

    const response = await this.addUserToWorkspaceRepository.addUserToWorkspace(
      workspaceId,
      { id: addedUser.id, role: user.role },
    );

    if (!response) return null;

    return { id: addedUser.id, name: addedUser.name, email: addedUser.email };
  }
}
