import { User } from 'domain/models/User';

export type ILoadAccountByTokenOutput = User | null;

export interface ILoadAccountByToken {
  loadByToken(token: string): Promise<ILoadAccountByTokenOutput>;
}
