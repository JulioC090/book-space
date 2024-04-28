import { ILoadAccountByToken } from '@/infra/protocols/repositories/ILoadAccountByToken';
import { ok, unauthorized } from '@/presentation/helpers/httpCodes';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/Http';
import { Middleware } from '@/presentation/protocols/Middleware';

export default class AuthMiddleware implements Middleware {
  private loadAccountByToken: ILoadAccountByToken;

  constructor(loadAccountByToken: ILoadAccountByToken) {
    this.loadAccountByToken = loadAccountByToken;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    if (!request.headers!.authorization) return unauthorized();

    const token = (request.headers!.authorization as string)
      .replace('Bearer ', '')
      .trim();
    if (token.length === 0) return unauthorized();

    const response = await this.loadAccountByToken.loadByToken(token);
    if (!response) return unauthorized();

    return ok({ accountId: response.id, account: response });
  }
}
