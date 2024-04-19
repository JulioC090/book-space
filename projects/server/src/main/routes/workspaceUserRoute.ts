import { adaptMiddleware } from '@/main/adapters/fastifyMiddlewareAdapter';
import { adaptRoute } from '@/main/adapters/fastifyRouteAdapter';
import { makeDeleteLeaveWorkspaceController } from '@/main/factories/controllers/DeleteLeaveWorkspaceControllerFactory';
import { makeDeleteUserInWorkspaceController } from '@/main/factories/controllers/DeleteUserInWorkspaceControllerFactory';
import { makePostUserToWorkspaceController } from '@/main/factories/controllers/PostUserToWorkspaceControllerFactory';
import { makePutWorkspaceUserRoleControllerFactory } from '@/main/factories/controllers/PutWorkspaceUserRoleControllerFactory';
import { makeAuthMiddleware } from '@/main/factories/middlewares/AuthMiddlewareFactory';
import { FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance) {
  app.addHook('preHandler', adaptMiddleware(makeAuthMiddleware()));

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
}
