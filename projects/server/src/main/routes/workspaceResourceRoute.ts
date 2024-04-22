import { adaptMiddleware } from '@/main/adapters/fastifyMiddlewareAdapter';
import { adaptRoute } from '@/main/adapters/fastifyRouteAdapter';
import { makeWorkspaceResourceController } from '@/main/factories/controllers/PostWorkspaceResourceControllerFactory';
import { makeAuthMiddleware } from '@/main/factories/middlewares/AuthMiddlewareFactory';
import { FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance) {
  app.addHook('preHandler', adaptMiddleware(makeAuthMiddleware()));

  app.post(
    '/workspace/:workspaceId/resource',
    adaptRoute(makeWorkspaceResourceController()),
  );
}
