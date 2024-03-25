import DeleteWorkspace from 'domain/usecases/DeleteWorkspace';
import { badRequest, ok } from 'presentation/helpers/httpCodes';
import { Controller } from 'presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
});

export default class DeleteWorkspaceController implements Controller {
  private deleteWorkspace: DeleteWorkspace;

  constructor(deleteWorkspace: DeleteWorkspace) {
    this.deleteWorkspace = deleteWorkspace;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequestParams = requestParamsSchema.safeParse(
      request.params,
    );
    if (!validatedRequestParams.success)
      return badRequest(validatedRequestParams.error.issues);

    const response = await this.deleteWorkspace.delete(
      validatedRequestParams.data.workspaceId,
    );

    if (!response) return badRequest({ error: 'Invalid workspace id' });
    return ok();
  }
}
