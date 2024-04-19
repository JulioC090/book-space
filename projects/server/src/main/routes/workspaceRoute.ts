import { makeDeleteLeaveWorkspaceController } from '@/main/factories/controllers/DeleteLeaveWorkspaceControllerFactory';
import { makeDeleteSpaceController } from '@/main/factories/controllers/DeleteSpaceControllerFactory';
import { makeDeleteUserInWorkspaceController } from '@/main/factories/controllers/DeleteUserInWorkspaceControllerFactory';
import { makeDeleteWorkspaceController } from '@/main/factories/controllers/DeleteWorkspaceControllerFactory';
import { makeGetWorkspaceDetailsController } from '@/main/factories/controllers/GetWorkspaceDetailsControllerFactory';
import { makeGetWorkspacesController } from '@/main/factories/controllers/GetWorkspacesControllerFactory';
import { makePatchWorkspaceController } from '@/main/factories/controllers/PatchWorkspaceControllerFactory';
import { makePostSpaceController } from '@/main/factories/controllers/PostSpaceControllerFactory';
import { makePostUserToWorkspaceController } from '@/main/factories/controllers/PostUserToWorkspaceControllerFactory';
import { makePostWorkspaceController } from '@/main/factories/controllers/PostWorkspaceControllerFactory';
import { makePutWorkspaceUserRoleControllerFactory } from '@/main/factories/controllers/PutWorkspaceUserRoleControllerFactory';
import { makeAuthMiddleware } from '@/main/factories/middlewares/AuthMiddlewareFactory';
import { FastifyInstance } from 'fastify';
import { adaptMiddleware } from 'main/adapters/fastifyMiddlewareAdapter';
import { adaptRoute } from 'main/adapters/fastifyRouteAdapter';

export default async function (app: FastifyInstance) {
  app.addHook('preHandler', adaptMiddleware(makeAuthMiddleware()));

  app.get('/workspaces', adaptRoute(makeGetWorkspacesController()));
  app.get(
    '/workspace/:workspaceId',
    adaptRoute(makeGetWorkspaceDetailsController()),
  );
  app.post('/workspace', adaptRoute(makePostWorkspaceController()));
  app.patch(
    '/workspace/:workspaceId',
    adaptRoute(makePatchWorkspaceController()),
  );
  app.delete(
    '/workspace/:workspaceId',
    adaptRoute(makeDeleteWorkspaceController()),
  );

  app.post(
    '/workspace/:workspaceId/user',
    adaptRoute(makePostUserToWorkspaceController()),
  );
  app.put(
    '/workspace/:workspaceId/user',
    adaptRoute(makePutWorkspaceUserRoleControllerFactory()),
  );
  app.delete(
    '/workspace/:workspaceId/user',
    adaptRoute(makeDeleteUserInWorkspaceController()),
  );
  app.delete(
    '/workspace/:workspaceId/leave',
    adaptRoute(makeDeleteLeaveWorkspaceController()),
  );

  app.post(
    '/workspace/:workspaceId/space',
    adaptRoute(makePostSpaceController()),
  );
  app.delete(
    '/workspace/:workspaceId/space/:spaceId',
    adaptRoute(makeDeleteSpaceController()),
  );
}
