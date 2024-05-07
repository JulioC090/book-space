import { adaptMiddleware } from '@/main/adapters/fastifyMiddlewareAdapter';
import { adaptRoute } from '@/main/adapters/fastifyRouteAdapter';
import { makePostBookController } from '@/main/factories/controllers/PostBookControllerFactory';
import { makeAuthMiddleware } from '@/main/factories/middlewares/AuthMiddlewareFactory';
import { FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance) {
  app.addHook('preHandler', adaptMiddleware(makeAuthMiddleware()));

  app.post('/space/:spaceId/book', adaptRoute(makePostBookController()));
}
