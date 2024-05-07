import ILoadSpaces from '@/domain/protocols/usecases/ILoadSpaces';
import { ok } from '@/presentation/helpers/httpCodes';
import { Controller } from '@/presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/Http';

export default class GetSpacesController implements Controller {
  private loadSpaces: ILoadSpaces;

  constructor(loadSpaces: ILoadSpaces) {
    this.loadSpaces = loadSpaces;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { accountId } = request as { accountId: string };

    const spaces = await this.loadSpaces.load(accountId);

    return ok(spaces);
  }
}
