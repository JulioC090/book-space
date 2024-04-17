import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';

export default interface IUpdateWorkspaceUserRoleRepository {
  updateUserRole(
    workspaceId: string,
    { userId, role }: { userId: string; role: WorkspaceRoles },
  ): Promise<boolean>;
}
