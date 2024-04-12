import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';

export default interface IChangeUserRoleRepository {
  changeRole(
    workspaceId: string,
    { userId, role }: { userId: string; role: WorkspaceRoles },
  ): Promise<boolean>;
}
