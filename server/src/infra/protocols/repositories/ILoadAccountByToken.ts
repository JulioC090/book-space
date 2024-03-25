export type ILoadAccountByTokenOutput = {
  id: string;
} | null;

export interface ILoadAccountByToken {
  loadByToken(token: string): Promise<ILoadAccountByTokenOutput>;
}
