import DeleteUserInWorkspace from '@/domain/usecases/DeleteUserInWorkspace';
import AccountPrismaRepository from '@/infra/database/prisma/AccountPrismaRepository';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import DeleteUserInWorkspaceController from '@/presentation/controllers/DeleteUserInWorkspaceController';

export const makeDeleteUserInWorkspaceController = () => {
  const accountRepository = new AccountPrismaRepository();
  const workspaceRepository = new WorkspacePrimaRepository();

  const deleteUserInWorkspace = new DeleteUserInWorkspace(
    workspaceRepository,
    workspaceRepository,
    accountRepository,
    workspaceRepository,
  );
  return new DeleteUserInWorkspaceController(deleteUserInWorkspace);
};
