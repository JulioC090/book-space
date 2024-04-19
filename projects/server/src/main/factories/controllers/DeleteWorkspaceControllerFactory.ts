import DeleteWorkspace from '@/domain/usecases/DeleteWorkspace';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import DeleteWorkspaceController from '@/presentation/controllers/DeleteWorkspaceController';

export const makeDeleteWorkspaceController = () => {
  const workspaceRepository = new WorkspacePrimaRepository();
  const deleteWorkspace = new DeleteWorkspace(
    workspaceRepository,
    workspaceRepository,
  );
  return new DeleteWorkspaceController(deleteWorkspace);
};
