export type ICheckAccountByEmailRepositoryOutput = boolean;

export interface ICheckAccountByEmailRepository {
  checkByEmail: (
    email: string,
  ) => Promise<ICheckAccountByEmailRepositoryOutput>;
}
