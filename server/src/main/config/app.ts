import cors from '@fastify/cors';
import fastify from 'fastify';
import accountRoute from 'main/routes/accountRoute';

export default function setupApp(opts = {}) {
  const app = fastify(opts);
  app.register(cors);
  app.register(accountRoute);

  return app;
}
