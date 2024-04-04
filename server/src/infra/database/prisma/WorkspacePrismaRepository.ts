import Workspace from 'domain/models/Workspace';
import { prisma } from 'infra/database/prisma/prismaClient';
import IAddUserToWorkspaceRepository from 'infra/protocols/repositories/IAddUserToWorkspaceRepository';
import IAddWorkspaceRepository, {
  IAddWorkspaceRepositoryInput,
  IAddWorkspaceRepositoryOutput,
} from 'infra/protocols/repositories/IAddWorkspaceRepository';
import ICheckUserExistInWorkspaceRepository from 'infra/protocols/repositories/ICheckUserExistInWorkspaceRepository';
import IDeleteUserInWorkspaceRepository from 'infra/protocols/repositories/IDeleteUserInWorkspaceRepository';
import IDeleteWorkspaceRepository from 'infra/protocols/repositories/IDeleteWorkspaceRepository';
import ILoadWorkspaceById from 'infra/protocols/repositories/ILoadWorkspaceById';
import ILoadWorkspacesRepository, {
  ILoadWorkspacesRepositoryOutput,
} from 'infra/protocols/repositories/ILoadWorkspacesRepository';
import IUpdateWorkspaceRepository from 'infra/protocols/repositories/IUpdateWorkspaceRepository';

export default class WorkspacePrimaRepository
  implements
    ILoadWorkspacesRepository,
    IAddWorkspaceRepository,
    IUpdateWorkspaceRepository,
    IDeleteWorkspaceRepository,
    ILoadWorkspaceById,
    ICheckUserExistInWorkspaceRepository,
    IAddUserToWorkspaceRepository,
    IDeleteUserInWorkspaceRepository
{
  async load(userId: string): Promise<ILoadWorkspacesRepositoryOutput> {
    return await prisma.workspace.findMany({
      where: { OR: [{ ownerId: userId }, { users: { some: { userId } } }] },
    });
  }

  async add(
    workspace: IAddWorkspaceRepositoryInput,
  ): Promise<IAddWorkspaceRepositoryOutput> {
    const result = await prisma.workspace.create({ data: workspace });
    return { workspaceId: result.id };
  }

  async update(
    userId: string,
    workspaceId: string,
    partialWorkspace: Partial<Omit<Workspace, 'id'>>,
  ): Promise<boolean> {
    const updatesWorkspace = await prisma.workspace.updateMany({
      where: { id: workspaceId, ownerId: userId },
      data: partialWorkspace,
    });
    return updatesWorkspace.count > 0;
  }

  async delete(userId: string, workspaceId: string): Promise<boolean> {
    const deletedUsers = await prisma.workspace.deleteMany({
      where: { id: workspaceId, ownerId: userId },
    });

    return deletedUsers.count > 0;
  }

  async checkUserInWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<boolean> {
    const user = await prisma.usersOnWorkspace.findFirst({
      where: { workspaceId, userId },
    });
    return !!user;
  }

  async loadById(workspaceId: string): Promise<Omit<Workspace, 'role'> | null> {
    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId },
    });
    return workspace;
  }

  async addUserToWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<boolean> {
    const createdUserOnWorkspace = await prisma.usersOnWorkspace.create({
      data: { userId, workspaceId },
    });
    return !!createdUserOnWorkspace;
  }

  async deleteUserInWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<boolean> {
    const deletedUser = await prisma.usersOnWorkspace.deleteMany({
      where: { userId, workspaceId },
    });

    return !!deletedUser;
  }
}
