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
import {
  ILoadAccountByEmailRepository,
  ILoadAccountByEmailRepositoryOutput,
} from 'infra/protocols/repositories/ILoadAccountByEmailRepository';
import {
  ILoadAccountByToken,
  ILoadAccountByTokenOutput,
} from 'infra/protocols/repositories/ILoadAccountByToken';
import { IUpdateAccessTokenRepository } from 'infra/protocols/repositories/IUpdateAccessTokenRepository';

export default class AccountPrismaRepository
  implements
    IAddAccountRepository,
    ICheckAccountByEmailRepository,
    ILoadAccountByEmailRepository,
    IUpdateAccessTokenRepository,
    ILoadAccountByToken
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

  async loadByEmail(
    email: string,
  ): Promise<ILoadAccountByEmailRepositoryOutput> {
    return await prisma.user.findFirst({ where: { email } });
  }

  async loadByToken(token: string): Promise<ILoadAccountByTokenOutput> {
    const account = await prisma.user.findFirst({ where: { token } });
    if (!account) return null;

    return { id: account.id };
  }

  async updateAccessToken(id: string, token: string | null): Promise<void> {
    await prisma.user.update({ where: { id }, data: { token } });
  }
}
