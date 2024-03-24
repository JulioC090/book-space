import { prisma } from 'infra/database/prisma/prismaClient';
import {
  IAddAccountRepository,
  IAddAccountRepositoryInput,
  IAddAccountRepositoryOutput,
} from 'infra/protocols/repositories/IAddAccountRepository';
import {
  ICheckAccountByEmailRepository,
  ICheckAccountByEmailRepositoryOutput,
} from 'infra/protocols/repositories/ICheckAccountByEmailRepository';

export default class AccountPrismaRepository
  implements IAddAccountRepository, ICheckAccountByEmailRepository
{
  async add(
    user: IAddAccountRepositoryInput,
  ): Promise<IAddAccountRepositoryOutput> {
    const result = await prisma.user.create({ data: user });
    return !!result;
  }

  async checkByEmail(
    email: string,
  ): Promise<ICheckAccountByEmailRepositoryOutput> {
    const account = await prisma.user.findFirst({ where: { email } });
    return account !== null;
  }
}
