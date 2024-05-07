import spaceBookingRoute from '@/main/routes/spaceBookingRoute';
import workspaceResourceRoute from '@/main/routes/workspaceResourceRoute';
import workspaceSpaceRoute from '@/main/routes/workspaceSpaceRoute';
import workspaceUserRoute from '@/main/routes/workspaceUserRoute';
import cors from '@fastify/cors';
import fastify from 'fastify';
import accountRoute from 'main/routes/accountRoute';
import workspaceRoute from 'main/routes/workspaceRoute';

export default function setupApp(opts = {}) {
  const app = fastify(opts);
  app.register(cors);
  app.register(accountRoute);
  app.register(workspaceRoute);
  app.register(workspaceUserRoute);
  app.register(workspaceSpaceRoute);
  app.register(workspaceResourceRoute);
  app.register(spaceBookingRoute);

  return app;
}
