import AddWorkspace from 'domain/usecases/AddWorkspace';
import DeleteWorkspace from 'domain/usecases/DeleteWorkspace';
import { FastifyInstance } from 'fastify';
import AccountPrismaRepository from 'infra/database/prisma/AccountPrismaRepository';
import WorkspacePrimaRepository from 'infra/database/prisma/WorkspacePrismaRepository';
import { adaptMiddleware } from 'main/adapters/fastifyMiddlewareAdapter';
import { adaptRoute } from 'main/adapters/fastifyRouteAdapter';
import AddWorkspaceController from 'presentation/controllers/AddWorkspaceController';
import DeleteWorkspaceController from 'presentation/controllers/DeleteWorkspaceController';
import AuthMiddleware from 'presentation/middleware/AuthMiddleware';

const accountRepository = new AccountPrismaRepository();
const authMiddleware = new AuthMiddleware(accountRepository);

const workspaceRepository = new WorkspacePrimaRepository();

const addWorkspace = new AddWorkspace(workspaceRepository);
const addWorkspaceController = new AddWorkspaceController(addWorkspace);

const deleteWorkspace = new DeleteWorkspace(workspaceRepository);
const deleteWorkspaceController = new DeleteWorkspaceController(
  deleteWorkspace,
);

export default async function (app: FastifyInstance) {
  app.addHook('preHandler', adaptMiddleware(authMiddleware));

  app.post('/workspace', adaptRoute(addWorkspaceController));
  app.delete('/workspace/:workspaceId', adaptRoute(deleteWorkspaceController));
}
