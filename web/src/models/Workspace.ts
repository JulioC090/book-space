import { User } from '@/models/User';

export type Workspace = {
  id: string;
  name: string;
  tag: string;
  role: 'OWNER' | 'DEFAULT';
  users?: Array<Omit<User, 'password'>>;
};
