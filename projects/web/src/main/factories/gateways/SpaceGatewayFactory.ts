import SpaceGateway from '@/infra/gateways/SpaceGateway';
import { axiosHttpClient } from '@/main/factories/http/AxiosHttpClientFactory';

export const makeSpaceGateway = () => {
  return new SpaceGateway(axiosHttpClient);
};
