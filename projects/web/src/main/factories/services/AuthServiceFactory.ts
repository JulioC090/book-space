import AuthService from '@/infra/services/AuthService';
import { makeAuthGateway } from '@/main/factories/gateways/AuthGatewayFactory';

const authGateway = makeAuthGateway();

export const makeAuthService = () =>
  new AuthService(authGateway, authGateway, authGateway);
