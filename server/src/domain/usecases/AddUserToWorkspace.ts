import { User } from 'domain/models/User';
import { UserRole } from 'domain/models/UserRole';
import IAddUserToWorkspaceRepository from 'infra/protocols/repositories/IAddUserToWorkspaceRepository';
import ICheckUserExistInWorkspaceRepository from 'infra/protocols/repositories/ICheckUserExistInWorkspaceRepository';
import { ILoadAccountByEmailRepository } from 'infra/protocols/repositories/ILoadAccountByEmailRepository';
import ILoadWorkspaceById from 'infra/protocols/repositories/ILoadWorkspaceById';

export default class AddUserToWorkspace {
  private loadWorkspaceByIdRepository: ILoadWorkspaceById;
  private loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository;
  private addUserToWorkspaceRepository: IAddUserToWorkspaceRepository;

  constructor(
    loadWorkspaceByIdRepository: ILoadWorkspaceById,
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    checkUserExistInWorkspaceRepository: ICheckUserExistInWorkspaceRepository,
    addUserToWorkspaceRepository: IAddUserToWorkspaceRepository,
  ) {
    this.loadWorkspaceByIdRepository = loadWorkspaceByIdRepository;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.checkUserExistInWorkspaceRepository =
      checkUserExistInWorkspaceRepository;
    this.addUserToWorkspaceRepository = addUserToWorkspaceRepository;
  }

  async addUserToWorkspace(
    authenticatedUser: User,
    workspaceId: string,
    user: { email: string; role: UserRole },
  ): Promise<{ id: string; name: string; email: string } | null> {
    const workspace =
      await this.loadWorkspaceByIdRepository.loadById(workspaceId);

    if (!workspace) return null;
    if (workspace.ownerId !== authenticatedUser.id) return null;
    if (user.email === authenticatedUser.email) return null;

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
