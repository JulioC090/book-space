import AccountPrismaRepository from '@/infra/database/prisma/AccountPrismaRepository';
import AuthMiddleware from '@/presentation/middleware/AuthMiddleware';

export const makeAuthMiddleware = () => {
  const accountRepository = new AccountPrismaRepository();
  return new AuthMiddleware(accountRepository);
};
