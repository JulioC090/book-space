import { adaptMiddleware } from '@/main/adapters/fastifyMiddlewareAdapter';
import { adaptRoute } from '@/main/adapters/fastifyRouteAdapter';
import { makeDeleteSpaceController } from '@/main/factories/controllers/DeleteSpaceControllerFactory';
import { makePostSpaceController } from '@/main/factories/controllers/PostSpaceControllerFactory';
import { makeAuthMiddleware } from '@/main/factories/middlewares/AuthMiddlewareFactory';
import { FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance) {
  app.addHook('preHandler', adaptMiddleware(makeAuthMiddleware()));

  app.post(
    '/workspace/:workspaceId/space',
    adaptRoute(makePostSpaceController()),
  );
  app.delete(
    '/workspace/:workspaceId/space/:spaceId',
    adaptRoute(makeDeleteSpaceController()),
  );
}
