import AddWorkspace from '@/domain/usecases/AddWorkspace';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import PostWorkspaceController from '@/presentation/controllers/PostWorkspaceController';

export const makePostWorkspaceController = () => {
  const workspaceRepository = new WorkspacePrimaRepository();
  const addWorkspace = new AddWorkspace(workspaceRepository);
  return new PostWorkspaceController(addWorkspace);
};
