import Workspace from 'domain/models/Workspace';
import { prisma } from 'infra/database/prisma/prismaClient';
import IAddWorkspaceRepository, {
  IAddWorkspaceRepositoryInput,
} from 'infra/protocols/repositories/IAddWorkspaceRepository';
import IDeleteWorkspaceRepository from 'infra/protocols/repositories/IDeleteWorkspaceRepository';
import ILoadWorkspacesRepository, {
  ILoadWorkspacesRepositoryOutput,
} from 'infra/protocols/repositories/ILoadWorkspacesRepository';
import IUpdateWorkspaceRepository from 'infra/protocols/repositories/IUpdateWorkspaceRepository';

export default class WorkspacePrimaRepository
  implements
    ILoadWorkspacesRepository,
    IAddWorkspaceRepository,
    IUpdateWorkspaceRepository,
    IDeleteWorkspaceRepository
{
  async load(userId: string): Promise<ILoadWorkspacesRepositoryOutput> {
    return await prisma.workspace.findMany({ where: { ownerId: userId } });
  }

  async add(workspace: IAddWorkspaceRepositoryInput): Promise<boolean> {
    const result = await prisma.workspace.create({ data: workspace });
    return !!result;
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
}
