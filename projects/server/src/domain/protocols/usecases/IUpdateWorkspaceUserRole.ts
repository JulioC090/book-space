import { User } from '@/domain/models/User';
import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';

export default interface IUpdateWorkspaceUserRole {
  updateUserRole(
    authenticatedUser: Omit<User, 'password'>,
    workspaceId: string,
    user: { email: string; role: WorkspaceRoles },
  ): Promise<boolean>;
}
