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
import { IUpdateAccessTokenRepository } from 'infra/protocols/repositories/IUpdateAccessTokenRepository';

export default class AccountPrismaRepository
  implements
    IAddAccountRepository,
    ICheckAccountByEmailRepository,
    ILoadAccountByEmailRepository,
    IUpdateAccessTokenRepository
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

  async updateAccessToken(id: string, token: string): Promise<void> {
    await prisma.user.update({ where: { id }, data: { token } });
  }
}
