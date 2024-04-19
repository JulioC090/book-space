import DeleteSpace from '@/domain/usecases/DeleteSpace';
import SpacePrismaRepository from '@/infra/database/prisma/SpacePrismaRepository';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import DeleteSpaceController from '@/presentation/controllers/DeleteSpaceController';

export const makeDeleteSpaceController = () => {
  const workspaceRepository = new WorkspacePrimaRepository();
  const spaceRepository = new SpacePrismaRepository();
  const deleteSpace = new DeleteSpace(
    workspaceRepository,
    spaceRepository,
    spaceRepository,
  );
  return new DeleteSpaceController(deleteSpace);
};
