import LoadWorkspaceDetails from '@/domain/usecases/LoadWorkspaceDetails';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import GetWorkspaceDetailsController from '@/presentation/controllers/GetWorkspaceDetailsController';

export const makeGetWorkspaceDetailsController = () => {
  const workspaceRepository = new WorkspacePrimaRepository();
  const loadWorkspaceDetails = new LoadWorkspaceDetails(
    workspaceRepository,
    workspaceRepository,
    workspaceRepository,
  );
  return new GetWorkspaceDetailsController(loadWorkspaceDetails);
};
