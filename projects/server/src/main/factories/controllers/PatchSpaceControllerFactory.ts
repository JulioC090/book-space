import UpdateSpace from '@/domain/usecases/UpdateSpace';
import SpacePrismaRepository from '@/infra/database/prisma/SpacePrismaRepository';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import PatchSpaceController from '@/presentation/controllers/PatchSpaceController';

export const makePatchSpaceController = () => {
  const workspaceRepository = new WorkspacePrimaRepository();
  const spaceRepository = new SpacePrismaRepository();
  const updateSpace = new UpdateSpace(
    workspaceRepository,
    spaceRepository,
    spaceRepository,
  );
  return new PatchSpaceController(updateSpace);
};
