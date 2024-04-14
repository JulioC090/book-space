import { User } from '@/models/User';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';

export default interface IWorkspaceUserService {
  add(
    workspaceId: string,
    user: { email: string; role: WorkspaceRoles },
  ): Promise<(Omit<User, 'password'> & { role: WorkspaceRoles }) | undefined>;
  update(
    workspaceId: string,
    user: { email: string; role: WorkspaceRoles },
  ): Promise<boolean>;
  delete(workspaceId: string, userEmail: string): Promise<boolean>;
  leave(workspaceId: string): Promise<boolean>;
}
