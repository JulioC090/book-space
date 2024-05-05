import Space from '@/domain/models/Space';
import { User } from '@/domain/models/User';

export default interface IAddSpace {
  add(
    authenticatedUser: Omit<User, 'password'>,
    workspaceId: string,
    space: Omit<Space, 'id'>,
    resources?: Array<string>,
  ): Promise<Space | null>;
}
