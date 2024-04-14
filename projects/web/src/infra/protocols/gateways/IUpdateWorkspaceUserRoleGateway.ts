import { WorkspaceRoles } from '@/models/WorkspaceRoles';

export default interface IUpdateWorkspaceUserRoleGateway {
  updateUserRole(
    workspaceId: string,
    userEmail: string,
    role: WorkspaceRoles,
  ): Promise<boolean>;
}
