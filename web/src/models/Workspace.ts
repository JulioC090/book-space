import { User } from '@/models/User';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';

export type Workspace = {
  id: string;
  name: string;
  tag: string;
  role: WorkspaceRoles;
  users?: Array<Omit<User, 'password'>>;
};
