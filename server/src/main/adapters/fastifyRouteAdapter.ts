import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller } from 'presentation/protocols/Controller';

export const adaptRoute = (controller: Controller) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const httpResponse = await controller.handle(request);
    return reply.code(httpResponse.status).send(httpResponse.body);
  };
};
