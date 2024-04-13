import AuthGateway from '@/infra/gateways/AuthGateway';
import { axiosHttpClient } from '@/main/factories/http/AxiosHttpClientFactory';

export const makeAuthGateway = () => new AuthGateway(axiosHttpClient);
