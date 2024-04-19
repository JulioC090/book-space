import AddUserToWorkspace from '@/domain/usecases/AddUserToWorkspace';
import AccountPrismaRepository from '@/infra/database/prisma/AccountPrismaRepository';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import PostUserToWorkspaceController from '@/presentation/controllers/PostUserToWorkspaceController';

export const makePostUserToWorkspaceController = () => {
  const accountRepository = new AccountPrismaRepository();
  const workspaceRepository = new WorkspacePrimaRepository();

  const addUserToWorkspace = new AddUserToWorkspace(
    workspaceRepository,
    workspaceRepository,
    accountRepository,
    workspaceRepository,
    workspaceRepository,
  );
  return new PostUserToWorkspaceController(addUserToWorkspace);
};
