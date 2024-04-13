import { User } from 'domain/models/User';

export type IAddAccountRepositoryInput = Omit<User, 'id'>;
export type IAddAccountRepositoryOutput = boolean;

export interface IAddAccountRepository {
  add: (
    user: IAddAccountRepositoryInput,
  ) => Promise<IAddAccountRepositoryOutput>;
}
