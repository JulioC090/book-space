import { User } from 'domain/models/User';

export type ILoadAccountByEmailRepositoryOutput = User | null;

export interface ILoadAccountByEmailRepository {
  loadByEmail: (email: string) => Promise<ILoadAccountByEmailRepositoryOutput>;
}
