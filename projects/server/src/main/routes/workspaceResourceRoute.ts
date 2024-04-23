import { adaptMiddleware } from '@/main/adapters/fastifyMiddlewareAdapter';
import { adaptRoute } from '@/main/adapters/fastifyRouteAdapter';
import { makeDeleteWorkspaceResourceController } from '@/main/factories/controllers/DeleteWorkspaceResourceControllerFactory';
import { makeWorkspaceResourceController } from '@/main/factories/controllers/PostWorkspaceResourceControllerFactory';
import { makeAuthMiddleware } from '@/main/factories/middlewares/AuthMiddlewareFactory';
import { FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance) {
  app.addHook('preHandler', adaptMiddleware(makeAuthMiddleware()));

  app.post(
    '/workspace/:workspaceId/resource',
    adaptRoute(makeWorkspaceResourceController()),
  );
  app.delete(
    '/workspace/:workspaceId/resource/:resourceId',
    adaptRoute(makeDeleteWorkspaceResourceController()),
  );
}
