import { prisma } from 'infra/database/prisma/prismaClient';
import IAddWorkspaceRepository, {
  IAddWorkspaceRepositoryInput,
} from 'infra/protocols/repositories/IAddWorkspaceRepository';
import IDeleteWorkspaceRepository from 'infra/protocols/repositories/IDeleteWorkspaceRepository';

export default class WorkspacePrimaRepository
  implements IAddWorkspaceRepository, IDeleteWorkspaceRepository
{
  async add(workspace: IAddWorkspaceRepositoryInput): Promise<boolean> {
    const result = await prisma.workspace.create({ data: workspace });
    return !!result;
  }

  async delete(workspaceId: string): Promise<boolean> {
    const deletedUsers = await prisma.workspace.deleteMany({
      where: { id: workspaceId },
    });

    return deletedUsers.count > 0;
  }
}
