import { prisma } from 'infra/database/prisma/prismaClient';
import IAddWorkspaceRepository, {
  IAddWorkspaceRepositoryInput,
} from 'infra/protocols/repositories/IAddWorkspaceRepository';
import IDeleteWorkspaceRepository from 'infra/protocols/repositories/IDeleteWorkspaceRepository';
import ILoadWorkspacesRepository, {
  ILoadWorkspacesRepositoryOutput,
} from 'infra/protocols/repositories/ILoadWorkspacesRepository';

export default class WorkspacePrimaRepository
  implements
    ILoadWorkspacesRepository,
    IAddWorkspaceRepository,
    IDeleteWorkspaceRepository
{
  async load(userId: string): Promise<ILoadWorkspacesRepositoryOutput> {
    return await prisma.workspace.findMany({ where: { ownerId: userId } });
  }

  async add(workspace: IAddWorkspaceRepositoryInput): Promise<boolean> {
    const result = await prisma.workspace.create({ data: workspace });
    return !!result;
  }

  async delete(userId: string, workspaceId: string): Promise<boolean> {
    const deletedUsers = await prisma.workspace.deleteMany({
      where: { id: workspaceId, ownerId: userId },
    });

    return deletedUsers.count > 0;
  }
}
