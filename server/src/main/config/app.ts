import cors from '@fastify/cors';
import fastify from 'fastify';
import accountRoute from 'main/routes/accountRoute';
import workspaceRoute from 'main/routes/workspaceRoute';

export default function setupApp(opts = {}) {
  const app = fastify(opts);
  app.register(cors);
  app.register(accountRoute);
  app.register(workspaceRoute);

  return app;
}
