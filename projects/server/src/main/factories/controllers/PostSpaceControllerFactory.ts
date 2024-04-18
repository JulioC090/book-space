import AddSpace from '@/domain/usecases/AddSpace';
import SpacePrismaRepository from '@/infra/database/prisma/SpacePrismaRepository';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import PostSpaceController from '@/presentation/controllers/PostSpaceController';

export const makePostSpaceController = () => {
  const workspaceRepository = new WorkspacePrimaRepository();
  const spaceRepository = new SpacePrismaRepository();
  const addSpace = new AddSpace(workspaceRepository, spaceRepository);
  return new PostSpaceController(addSpace);
};
