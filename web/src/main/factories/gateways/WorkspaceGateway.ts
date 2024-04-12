import WorkspaceGateway from '@/infra/gateways/WorkspaceGateway';
import { axiosHttpClient } from '@/main/factories/http/AxiosHttpClientFactory';

export const makeWorkspaceGateway = () => new WorkspaceGateway(axiosHttpClient);
