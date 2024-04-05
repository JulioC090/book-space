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
import ILoadWorkspaceDetailsRepository from 'infra/protocols/repositories/ILoadWorkspaceDetailsRepository';
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
    IDeleteUserInWorkspaceRepository,
    ILoadWorkspaceDetailsRepository
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
    await prisma.usersOnWorkspace.deleteMany({ where: { workspaceId } });

    const deletedWorkspaces = await prisma.workspace.deleteMany({
      where: { AND: [{ id: workspaceId }, { ownerId: userId }] },
    });

    return deletedWorkspaces.count > 0;
  }

  async checkUserInWorkspace(
    workspaceId: string,
    userId: string,
  ): Promise<boolean> {
    const workspace = await prisma.workspace.findFirst({
      where: {
        id: workspaceId,
        ownerId: userId,
      },
    });

    if (workspace) return true;

    const userOnWorkspace = await prisma.usersOnWorkspace.findFirst({
      where: { workspaceId, userId },
    });

    return !!userOnWorkspace;
  }

  async loadById(workspaceId: string): Promise<Omit<Workspace, 'role'> | null> {
    const workspace = await prisma.workspace.findFirst({
      where: { id: workspaceId },
    });
    return workspace;
  }

  async loadWorkspaceDetails(
    workspaceId: string,
  ): Promise<Required<Omit<Workspace, 'role'>> | null> {
    const workspace = await prisma.workspace.findFirst({
      include: {
        users: {
          select: { user: { select: { id: true, email: true, name: true } } },
        },
      },
      where: { id: workspaceId },
    });

    if (!workspace) return null;

    return { ...workspace, users: workspace.users.map((user) => user.user) };
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
