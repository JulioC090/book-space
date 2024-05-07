import { adaptMiddleware } from '@/main/adapters/fastifyMiddlewareAdapter';
import { adaptRoute } from '@/main/adapters/fastifyRouteAdapter';
import { makeGetSpaceBookingsController } from '@/main/factories/controllers/GetSpaceBookingsControllerFactory';
import { makePostBookController } from '@/main/factories/controllers/PostBookControllerFactory';
import { makeAuthMiddleware } from '@/main/factories/middlewares/AuthMiddlewareFactory';
import { FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance) {
  app.addHook('preHandler', adaptMiddleware(makeAuthMiddleware()));

  app.get(
    '/space/:spaceId/bookings/:day',
    adaptRoute(makeGetSpaceBookingsController()),
  );
  app.post('/space/:spaceId/book', adaptRoute(makePostBookController()));
}
