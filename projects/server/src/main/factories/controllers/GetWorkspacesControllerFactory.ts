import LoadWorkspaces from '@/domain/usecases/LoadWorkspaces';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import GetWorkspacesController from '@/presentation/controllers/GetWorkspacesController';

export const makeGetWorkspacesController = () => {
  const workspaceRepository = new WorkspacePrimaRepository();
  const loadWorkspaces = new LoadWorkspaces(workspaceRepository);
  return new GetWorkspacesController(loadWorkspaces);
};
