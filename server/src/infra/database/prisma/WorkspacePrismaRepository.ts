import { prisma } from 'infra/database/prisma/prismaClient';
import IAddWorkspaceRepository, {
  IAddWorkspaceRepositoryInput,
} from 'infra/protocols/repositories/IAddWorkspaceRepository';

export default class WorkspacePrimaRepository
  implements IAddWorkspaceRepository
{
  async add(workspace: IAddWorkspaceRepositoryInput): Promise<boolean> {
    const result = await prisma.workspace.create({ data: workspace });
    return !!result;
  }
}
