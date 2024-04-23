import DeleteWorkspaceResource from '@/domain/usecases/DeleteWorkspaceResource';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import WorkspaceResourcePrismaRepository from '@/infra/database/prisma/WorkspaceResourcePrismaRepository';
import DeleteWorkspaceResourceController from '@/presentation/controllers/DeleteWorkspaceResourceController';

export const makeDeleteWorkspaceResourceController = () => {
  const workspaceRepository = new WorkspacePrimaRepository();
  const workspaceResourceRepository = new WorkspaceResourcePrismaRepository();
  const deleteWorkspaceResource = new DeleteWorkspaceResource(
    workspaceRepository,
    workspaceResourceRepository,
  );
  return new DeleteWorkspaceResourceController(deleteWorkspaceResource);
};
