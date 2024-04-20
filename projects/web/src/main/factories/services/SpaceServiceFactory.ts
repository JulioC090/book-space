import SpaceService from '@/infra/services/SpaceService';
import { makeSpaceGateway } from '@/main/factories/gateways/SpaceGatewayFactory';

export const makeSpaceService = () => {
  return new SpaceService(makeSpaceGateway());
};
