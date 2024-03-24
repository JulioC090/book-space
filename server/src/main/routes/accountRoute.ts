import AddAccount from 'domain/usecases/AddAccount';
import { FastifyInstance } from 'fastify';
import { BcryptAdapter } from 'infra/cryptography/bcryptAdapter';
import AccountPrismaRepository from 'infra/database/prisma/AccountPrismaRepository';
import { adaptRoute } from 'main/adapters/fastifyRouteAdapter';
import SignUpController from 'presentation/controllers/SignUpController';

const hasher = new BcryptAdapter(12);

const accountRepository = new AccountPrismaRepository();
const addAccount = new AddAccount(hasher, accountRepository, accountRepository);
const signUpController = new SignUpController(addAccount);

export default async function (app: FastifyInstance) {
  app.post('/signup', adaptRoute(signUpController));
}
