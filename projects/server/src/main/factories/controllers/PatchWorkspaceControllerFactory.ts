import UpdateWorkspace from '@/domain/usecases/UpdateWorkspace';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import PatchWorkspaceController from '@/presentation/controllers/PatchWorkspaceController';

export const makePatchWorkspaceController = () => {
  const workspaceRepository = new WorkspacePrimaRepository();
  const updateWorkspace = new UpdateWorkspace(
    workspaceRepository,
    workspaceRepository,
  );
  return new PatchWorkspaceController(updateWorkspace);
};
