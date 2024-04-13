import { HttpCode } from '@/consts/httpCodes';
import ILogoutGateway from '@/infra/protocols/gateways/ILogoutGateway';
import ISignInGateway, {
  ISignInGatewayInput,
  ISignInGatewayOutput,
} from '@/infra/protocols/gateways/ISignInGateway';
import ISignUpGateway from '@/infra/protocols/gateways/ISignUpGateway';
import IHttpClient from '@/infra/protocols/http/IHttpClient';
import { User } from '@/models/User';

export default class AuthGateway
  implements ISignUpGateway, ISignInGateway, ILogoutGateway
{
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async signup(user: Omit<User, 'id'>): Promise<boolean> {
    const httpClientResponse = await this.httpClient.post<Omit<User, 'id'>>({
      url: '/signup',
      body: user,
    });
    return httpClientResponse.status === HttpCode.CREATED;
  }

  async signin(
    user: ISignInGatewayInput,
  ): Promise<ISignInGatewayOutput | null> {
    const httpClientResponse = await this.httpClient.post<
      ISignInGatewayInput,
      ISignInGatewayOutput
    >({
      url: '/signin',
      body: user,
    });

    this.httpClient.setHeader(
      'Authorization',
      `Bearer ${httpClientResponse.body!.token}`,
    );

    if (!httpClientResponse || httpClientResponse.status !== HttpCode.OK)
      return null;
    return httpClientResponse.body!;
  }

  async logout(): Promise<void> {
    await this.httpClient.post({
      url: '/logout',
    });
  }
}
