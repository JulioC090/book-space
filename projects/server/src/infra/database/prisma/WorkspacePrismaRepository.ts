import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import IUpdateWorkspaceUserRoleRepository from '@/infra/protocols/repositories/IUpdateWorkspaceUserRoleRepository';
import { UsersOnWorkspaceRole } from '@prisma/client';
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
import ILoadUserRoleRepository from 'infra/protocols/repositories/ILoadUserRoleRepository';
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
    ILoadWorkspaceDetailsRepository,
    IUpdateWorkspaceUserRoleRepository,
    ILoadUserRoleRepository
{
  async load(userId: string): Promise<ILoadWorkspacesRepositoryOutput> {
    const response = await prisma.workspace.findMany({
      where: {
        OR: [{ ownerId: userId }, { users: { some: { userId } } }],
      },
      include: { users: { select: { role: true }, where: { userId } } },
    });

    return response.map((workspace) => ({
      id: workspace.id,
      name: workspace.name,
      ownerId: workspace.ownerId,
      tag: workspace.tag,
      role:
        workspace!.users.length === 0
          ? WorkspaceRoles.OWNER
          : (workspace!.users[0].role as WorkspaceRoles),
    }));
  }

  async add(
    workspace: IAddWorkspaceRepositoryInput,
  ): Promise<IAddWorkspaceRepositoryOutput> {
    const result = await prisma.workspace.create({ data: workspace });
    return { workspaceId: result.id };
  }

  async update(
    workspaceId: string,
    partialWorkspace: Partial<Omit<Workspace, 'id'>>,
  ): Promise<boolean> {
    const updatesWorkspace = await prisma.workspace.updateMany({
      where: { id: workspaceId },
      data: partialWorkspace,
    });
    return updatesWorkspace.count > 0;
  }

  async delete(workspaceId: string): Promise<boolean> {
    await prisma.usersOnWorkspace.deleteMany({ where: { workspaceId } });

    const deletedWorkspaces = await prisma.workspace.deleteMany({
      where: { id: workspaceId },
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
          select: {
            user: { select: { id: true, email: true, name: true } },
            role: true,
          },
        },
        spaces: {
          select: {
            id: true,
            name: true,
            description: true,
            maxAmountOfPeople: true,
          },
        },
        resources: { select: { id: true, name: true } },
      },
      where: { id: workspaceId },
    });

    if (!workspace) return null;

    return {
      ...workspace,
      users: workspace.users.map((user) => ({
        ...user.user,
        role: user.role as WorkspaceRoles,
      })),
    };
  }

  async addUserToWorkspace(
    workspaceId: string,
    { id, role }: { id: string; role: Omit<WorkspaceRoles, 'OWNER'> },
  ): Promise<boolean> {
    const createdUserOnWorkspace = await prisma.usersOnWorkspace.create({
      data: { userId: id, workspaceId, role: role as UsersOnWorkspaceRole },
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

  async updateUserRole(
    workspaceId: string,
    { userId, role }: { userId: string; role: WorkspaceRoles },
  ): Promise<boolean> {
    const changedUser = await prisma.usersOnWorkspace.updateMany({
      where: { AND: [{ userId }, { workspaceId }] },
      data: { role: role as UsersOnWorkspaceRole },
    });

    return !!changedUser;
  }

  async loadUserRole(
    userId: string,
    workspaceId: string,
  ): Promise<WorkspaceRoles | null> {
    const response = await prisma.workspace.findFirst({
      where: { id: workspaceId },
      include: { users: { select: { role: true }, where: { userId } } },
    });

    if (!response) return null;
    if (response?.users.length === 0 && response.ownerId !== userId)
      return null;

    const role =
      response!.users.length === 0
        ? WorkspaceRoles.OWNER
        : (response!.users[0].role as WorkspaceRoles);

    return role;
  }
}
