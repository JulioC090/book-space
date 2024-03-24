import cors from '@fastify/cors';
import fastify from 'fastify';

export default function setupApp(opts = {}) {
  const app = fastify(opts);
  app.register(cors);

  return app;
}
