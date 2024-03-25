import AddAccount from 'domain/usecases/AddAccount';
import Authentication from 'domain/usecases/Authentication';
import Logout from 'domain/usecases/Logout';
import { FastifyInstance } from 'fastify';
import { BcryptAdapter } from 'infra/cryptography/BcryptAdapter';
import JWTAdapter from 'infra/cryptography/JWTAdapter';
import AccountPrismaRepository from 'infra/database/prisma/AccountPrismaRepository';
import { adaptMiddleware } from 'main/adapters/fastifyMiddlewareAdapter';
import { adaptRoute } from 'main/adapters/fastifyRouteAdapter';
import env from 'main/config/env';
import LogoutController from 'presentation/controllers/LogoutController';
import SignInController from 'presentation/controllers/SignInController';
import SignUpController from 'presentation/controllers/SignUpController';
import AuthMiddleware from 'presentation/middleware/AuthMiddleware';

const hasher = new BcryptAdapter(12);
const encrypter = new JWTAdapter(env.jwtSecret);
const accountRepository = new AccountPrismaRepository();

const addAccount = new AddAccount(hasher, accountRepository, accountRepository);
const signUpController = new SignUpController(addAccount);

const authentication = new Authentication(
  hasher,
  encrypter,
  accountRepository,
  accountRepository,
);
const signInController = new SignInController(authentication);

const logout = new Logout(accountRepository);
const logoutController = new LogoutController(logout);

const authMiddleware = new AuthMiddleware(accountRepository);

export default async function (app: FastifyInstance) {
  app.post('/signup', adaptRoute(signUpController));
  app.post('/signin', adaptRoute(signInController));
  app.post(
    '/logout',
    { preHandler: adaptMiddleware(authMiddleware) },
    adaptRoute(logoutController),
  );
}
