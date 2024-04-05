import { User } from 'domain/models/User';

export default interface Workspace {
  id: string;
  ownerId: string;
  name: string;
  tag: string;
  role?: 'OWNER' | 'DEFAULT';
  users?: Array<Omit<User, 'password'>>;
}
