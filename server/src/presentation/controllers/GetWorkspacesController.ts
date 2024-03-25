import LoadWorkspaces from 'domain/usecases/LoadWorkspaces';
import { ok } from 'presentation/helpers/httpCodes';
import { Controller } from 'presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';

export default class GetWorkspacesController implements Controller {
  private loadWorkspaces: LoadWorkspaces;

  constructor(loadWorkspaces: LoadWorkspaces) {
    this.loadWorkspaces = loadWorkspaces;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { accountId } = request as { accountId: string };

    const response = await this.loadWorkspaces.load(accountId);
    return ok(response);
  }
}
