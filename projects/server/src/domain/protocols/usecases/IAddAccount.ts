import { User } from '@/domain/models/User';

export default interface IAddAccount {
  add(user: Omit<User, 'id'>): Promise<boolean>;
}
