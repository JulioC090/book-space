import AddWorkspaceResource from '@/domain/usecases/AddWorkspaceResource';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import WorkspaceResourcePrismaRepository from '@/infra/database/prisma/WorkspaceResourcePrismaRepository';
import PostWorkspaceResourceController from '@/presentation/controllers/PostWorkspaceResourceController';

export const makeWorkspaceResourceController = () => {
  const workspaceRepository = new WorkspacePrimaRepository();
  const workspaceResourceRepository = new WorkspaceResourcePrismaRepository();
  const addWorkspaceResource = new AddWorkspaceResource(
    workspaceRepository,
    workspaceResourceRepository,
    workspaceResourceRepository,
  );
  return new PostWorkspaceResourceController(addWorkspaceResource);
};
