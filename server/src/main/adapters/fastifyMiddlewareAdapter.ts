import { FastifyReply, FastifyRequest } from 'fastify';
import { Middleware } from 'presentation/protocols/Middleware';

export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const httpResponse = await middleware.handle(request);
    if (httpResponse.status !== 200)
      reply.code(httpResponse.status).send(httpResponse.body);

    Object.assign(request, httpResponse.body);
  };
};
