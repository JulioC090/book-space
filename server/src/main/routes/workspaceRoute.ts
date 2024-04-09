import AddUserToWorkspace from 'domain/usecases/AddUserToWorkspace';
import AddWorkspace from 'domain/usecases/AddWorkspace';
import ChangeUserRoleInWorkspace from 'domain/usecases/ChangeUserRoleInWorkspace';
import DeleteUserInWorkspace from 'domain/usecases/DeleteUserInWorkspace';
import DeleteWorkspace from 'domain/usecases/DeleteWorkspace';
import LeaveWorkspace from 'domain/usecases/LeaveWorkspace';
import LoadWorkspaceDetails from 'domain/usecases/LoadWorkspaceDetails';
import LoadWorkspaces from 'domain/usecases/LoadWorkspaces';
import UpdateWorkspace from 'domain/usecases/UpdateWorkspace';
import { FastifyInstance } from 'fastify';
import AccountPrismaRepository from 'infra/database/prisma/AccountPrismaRepository';
import WorkspacePrimaRepository from 'infra/database/prisma/WorkspacePrismaRepository';
import { adaptMiddleware } from 'main/adapters/fastifyMiddlewareAdapter';
import { adaptRoute } from 'main/adapters/fastifyRouteAdapter';
import DeleteLeaveWorkspaceController from 'presentation/controllers/DeleteLeaveWorkspaceController';
import DeleteUserInWorkspaceController from 'presentation/controllers/DeleteUserInWorkspaceController';
import DeleteWorkspaceController from 'presentation/controllers/DeleteWorkspaceController';
import GetWorkspaceDetailsController from 'presentation/controllers/GetWorkspaceDetailsController';
import GetWorkspacesController from 'presentation/controllers/GetWorkspacesController';
import PatchWorkspaceController from 'presentation/controllers/PatchWorkspaceController';
import PostUserToWorkspaceController from 'presentation/controllers/PostUserToWorkspaceController';
import PostWorkspaceController from 'presentation/controllers/PostWorkspaceController';
import PutUserRoleInWorkspaceController from 'presentation/controllers/PutUserRoleInWorkspaceController';
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

const deleteWorkspace = new DeleteWorkspace(
  workspaceRepository,
  workspaceRepository,
);
const deleteWorkspaceController = new DeleteWorkspaceController(
  deleteWorkspace,
);

const loadWorkspaceDetails = new LoadWorkspaceDetails(
  workspaceRepository,
  workspaceRepository,
);
const getWorkspaceDetailsController = new GetWorkspaceDetailsController(
  loadWorkspaceDetails,
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

const leaveWorkspace = new LeaveWorkspace(
  workspaceRepository,
  workspaceRepository,
  workspaceRepository,
);
const deleteLeaveWorkspaceController = new DeleteLeaveWorkspaceController(
  leaveWorkspace,
);

const changeUserRoleInWorkspace = new ChangeUserRoleInWorkspace(
  workspaceRepository,
  accountRepository,
  workspaceRepository,
  workspaceRepository,
);
const putUserRoleInWorkspaceController = new PutUserRoleInWorkspaceController(
  changeUserRoleInWorkspace,
);

export default async function (app: FastifyInstance) {
  app.addHook('preHandler', adaptMiddleware(authMiddleware));

  app.get('/workspaces', adaptRoute(getWorkspacesController));
  app.get('/workspace/:workspaceId', adaptRoute(getWorkspaceDetailsController));
  app.post('/workspace', adaptRoute(postWorkspaceController));
  app.patch('/workspace/:workspaceId', adaptRoute(patchWorkspaceController));
  app.delete('/workspace/:workspaceId', adaptRoute(deleteWorkspaceController));

  app.post(
    '/workspace/:workspaceId/user',
    adaptRoute(postUserToWorkspaceController),
  );
  app.put(
    '/workspace/:workspaceId/user',
    adaptRoute(putUserRoleInWorkspaceController),
  );
  app.delete(
    '/workspace/:workspaceId/user',
    adaptRoute(deleteUserInWorkspaceController),
  );
  app.delete(
    '/workspace/:workspaceId/leave',
    adaptRoute(deleteLeaveWorkspaceController),
  );
}
