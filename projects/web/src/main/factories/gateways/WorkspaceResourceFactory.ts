import WorkspaceResourceGateway from '@/infra/gateways/WorkspaceResourceGateway';
import { axiosHttpClient } from '@/main/factories/http/AxiosHttpClientFactory';

export const makeWorkspaceResourceGateway = () => {
  return new WorkspaceResourceGateway(axiosHttpClient);
};
