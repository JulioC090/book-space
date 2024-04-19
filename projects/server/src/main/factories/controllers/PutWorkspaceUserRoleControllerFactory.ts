import UpdateWorkspaceUserRole from '@/domain/usecases/UpdateWorkspaceUserRole';
import AccountPrismaRepository from '@/infra/database/prisma/AccountPrismaRepository';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import PutWorkspaceUserRoleController from '@/presentation/controllers/PutWorkspaceUserRoleController';

export const makePutWorkspaceUserRoleControllerFactory = () => {
  const accountRepository = new AccountPrismaRepository();
  const workspaceRepository = new WorkspacePrimaRepository();

  const updateWorkspaceUserRole = new UpdateWorkspaceUserRole(
    workspaceRepository,
    workspaceRepository,
    accountRepository,
    workspaceRepository,
  );
  return new PutWorkspaceUserRoleController(updateWorkspaceUserRole);
};
