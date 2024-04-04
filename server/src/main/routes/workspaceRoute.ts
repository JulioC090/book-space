import AddUserToWorkspace from 'domain/usecases/AddUserToWorkspace';
import AddWorkspace from 'domain/usecases/AddWorkspace';
import DeleteUserInWorkspace from 'domain/usecases/DeleteUserInWorkspace';
import DeleteWorkspace from 'domain/usecases/DeleteWorkspace';
import LoadWorkspaces from 'domain/usecases/LoadWorkspaces';
import UpdateWorkspace from 'domain/usecases/UpdateWorkspace';
import { FastifyInstance } from 'fastify';
import AccountPrismaRepository from 'infra/database/prisma/AccountPrismaRepository';
import WorkspacePrimaRepository from 'infra/database/prisma/WorkspacePrismaRepository';
import { adaptMiddleware } from 'main/adapters/fastifyMiddlewareAdapter';
import { adaptRoute } from 'main/adapters/fastifyRouteAdapter';
import DeleteUserInWorkspaceController from 'presentation/controllers/DeleteUserInWorkspaceController';
import DeleteWorkspaceController from 'presentation/controllers/DeleteWorkspaceController';
import GetWorkspacesController from 'presentation/controllers/GetWorkspacesController';
import PatchWorkspaceController from 'presentation/controllers/PatchWorkspaceController';
import PostUserToWorkspaceController from 'presentation/controllers/PostUserToWorkspaceController';
import PostWorkspaceController from 'presentation/controllers/PostWorkspaceController';
import AuthMiddleware from 'presentation/middleware/AuthMiddleware';

const accountRepository = new AccountPrismaRepository();
const authMiddleware = new AuthMiddleware(accountRepository);

const workspaceRepository = new WorkspacePrimaRepository();

const loadWorkspaces = new LoadWorkspaces(workspaceRepository);
const getWorkspacesController = new GetWorkspacesController(loadWorkspaces);

const addWorkspace = new AddWorkspace(workspaceRepository);
const postWorkspaceController = new PostWorkspaceController(addWorkspace);

const updateWorkspace = new UpdateWorkspace(workspaceRepository);
const patchWorkspaceController = new PatchWorkspaceController(updateWorkspace);

const deleteWorkspace = new DeleteWorkspace(workspaceRepository);
const deleteWorkspaceController = new DeleteWorkspaceController(
  deleteWorkspace,
);

const addUserToWorkspace = new AddUserToWorkspace(
  workspaceRepository,
  accountRepository,
  workspaceRepository,
  workspaceRepository,
);
const postUserToWorkspaceController = new PostUserToWorkspaceController(
  addUserToWorkspace,
);

const deleteUserInWorkspace = new DeleteUserInWorkspace(
  workspaceRepository,
  workspaceRepository,
  accountRepository,
  workspaceRepository,
);
const deleteUserInWorkspaceController = new DeleteUserInWorkspaceController(
  deleteUserInWorkspace,
);

export default async function (app: FastifyInstance) {
  app.addHook('preHandler', adaptMiddleware(authMiddleware));

  app.get('/workspaces', adaptRoute(getWorkspacesController));
  app.post('/workspace', adaptRoute(postWorkspaceController));
  app.patch('/workspace/:workspaceId', adaptRoute(patchWorkspaceController));
  app.delete('/workspace/:workspaceId', adaptRoute(deleteWorkspaceController));

  app.post(
    '/workspace/:workspaceId/user',
    adaptRoute(postUserToWorkspaceController),
  );
  app.delete(
    '/workspace/:workspaceId/user',
    adaptRoute(deleteUserInWorkspaceController),
  );
}
