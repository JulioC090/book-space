import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';

export default interface IAddUserToWorkspaceRepository {
  addUserToWorkspace(
    workspaceId: string,
    user: { id: string; role: WorkspaceRoles },
  ): Promise<boolean>;
}
