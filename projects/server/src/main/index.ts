import setupApp from 'main/config/app';
import env from 'main/config/env';

const server = setupApp();
const port = env.serverPort;

server.listen({ port }, (err, address) => {
  console.log(`Server is now listening on ${address}`);
});
