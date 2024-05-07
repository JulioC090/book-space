import { adaptMiddleware } from '@/main/adapters/fastifyMiddlewareAdapter';
import { adaptRoute } from '@/main/adapters/fastifyRouteAdapter';
import { makeDeleteSpaceController } from '@/main/factories/controllers/DeleteSpaceControllerFactory';
import { makeGetSpacesController } from '@/main/factories/controllers/GetSpacesControllerFactory';
import { makePatchSpaceController } from '@/main/factories/controllers/PatchSpaceControllerFactory';
import { makePostSpaceController } from '@/main/factories/controllers/PostSpaceControllerFactory';
import { makeAuthMiddleware } from '@/main/factories/middlewares/AuthMiddlewareFactory';
import { FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance) {
  app.addHook('preHandler', adaptMiddleware(makeAuthMiddleware()));

  app.get('/spaces', adaptRoute(makeGetSpacesController()));

  app.post(
    '/workspace/:workspaceId/space',
    adaptRoute(makePostSpaceController()),
  );
  app.patch(
    '/workspace/:workspaceId/space/:spaceId',
    adaptRoute(makePatchSpaceController()),
  );
  app.delete(
    '/workspace/:workspaceId/space/:spaceId',
    adaptRoute(makeDeleteSpaceController()),
  );
}
