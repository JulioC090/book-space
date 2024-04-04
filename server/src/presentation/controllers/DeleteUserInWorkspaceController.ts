import { User } from 'domain/models/User';
import DeleteUserInWorkspace from 'domain/usecases/DeleteUserInWorkspace';
import { badRequest, forbidden, ok } from 'presentation/helpers/httpCodes';
import { Controller } from 'presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
});

const requestBodySchema = z.object({
  userEmail: z.string().min(1),
});

export default class DeleteUserInWorkspaceController implements Controller {
  private deleteUserInWorkspace: DeleteUserInWorkspace;

  constructor(deleteUserInWorkspace: DeleteUserInWorkspace) {
    this.deleteUserInWorkspace = deleteUserInWorkspace;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequestParams = requestParamsSchema.safeParse(
      request.params,
    );
    if (!validatedRequestParams.success)
      return badRequest(validatedRequestParams.error.issues);

    const validatedRequestBody = requestBodySchema.safeParse(request.body);
    if (!validatedRequestBody.success)
      return badRequest(validatedRequestBody.error.issues);

    const { account } = request as { account: User };

    const response = await this.deleteUserInWorkspace.deleteUserInWorkspace(
      account,
      validatedRequestParams.data.workspaceId,
      validatedRequestBody.data.userEmail,
    );

    if (!response) return forbidden();
    return ok();
  }
}
