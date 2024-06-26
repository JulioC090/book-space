import Resource from '@/domain/models/Resource';
import Space from '@/domain/models/Space';
import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';
import { User } from 'domain/models/User';

export default interface Workspace {
  id: string;
  ownerId: string;
  name: string;
  tag: string;
  role?: WorkspaceRoles;
  resources?: Array<Resource>;
  users?: Array<Omit<User, 'password'> & { role: WorkspaceRoles }>;
  spaces?: Array<Omit<Space, 'workspaceId'>>;
}
