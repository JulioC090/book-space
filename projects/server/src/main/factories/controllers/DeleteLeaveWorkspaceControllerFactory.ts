import LeaveWorkspace from '@/domain/usecases/LeaveWorkspace';
import WorkspacePrimaRepository from '@/infra/database/prisma/WorkspacePrismaRepository';
import DeleteLeaveWorkspaceController from '@/presentation/controllers/DeleteLeaveWorkspaceController';

export const makeDeleteLeaveWorkspaceController = () => {
  const workspaceRepository = new WorkspacePrimaRepository();

  const leaveWorkspace = new LeaveWorkspace(
    workspaceRepository,
    workspaceRepository,
  );

  return new DeleteLeaveWorkspaceController(leaveWorkspace);
};
