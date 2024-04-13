import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';

export default interface ILoadUserRoleRepository {
  loadUserRole(
    userId: string,
    workspaceId: string,
  ): Promise<WorkspaceRoles | null>;
}
