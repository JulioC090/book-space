import 'dotenv/config';
import * as env from 'env-var';

export default {
  serverPort: env.get('SERVER_PORT').default(3000).asPortNumber(),
  jwtSecret: env.get('JWT_SECRET').required().asString(),
};
