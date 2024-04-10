import { User } from 'domain/models/User';
import { UserRole } from 'domain/models/UserRole';

export default interface Workspace {
  id: string;
  ownerId: string;
  name: string;
  tag: string;
  role?: UserRole | 'OWNER';
  users?: Array<Omit<User, 'password'>>;
}
