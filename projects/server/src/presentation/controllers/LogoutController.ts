import Logout from 'domain/usecases/Logout';
import { ok } from 'presentation/helpers/httpCodes';
import { Controller } from 'presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';

export default class LogoutController implements Controller {
  private logout: Logout;

  constructor(logout: Logout) {
    this.logout = logout;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { accountId } = request as { accountId: string };
    await this.logout.logout(accountId);
    return ok();
  }
}
