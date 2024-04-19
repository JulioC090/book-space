import { makeDeleteWorkspaceController } from '@/main/factories/controllers/DeleteWorkspaceControllerFactory';
import { makeGetWorkspaceDetailsController } from '@/main/factories/controllers/GetWorkspaceDetailsControllerFactory';
import { makeGetWorkspacesController } from '@/main/factories/controllers/GetWorkspacesControllerFactory';
import { makePatchWorkspaceController } from '@/main/factories/controllers/PatchWorkspaceControllerFactory';
import { makePostWorkspaceController } from '@/main/factories/controllers/PostWorkspaceControllerFactory';
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
}
