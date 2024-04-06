import { User } from 'domain/models/User';
import AddUserToWorkspace from 'domain/usecases/AddUserToWorkspace';
import { badRequest, created, forbidden } from 'presentation/helpers/httpCodes';
import { Controller } from 'presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
});

const requestBodySchema = z.object({
  userEmail: z.string().min(1),
});

export default class PostUserToWorkspaceController implements Controller {
  private addUserToWorkspace: AddUserToWorkspace;

  constructor(addUserToWorkspace: AddUserToWorkspace) {
    this.addUserToWorkspace = addUserToWorkspace;
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

    const response = await this.addUserToWorkspace.addUserToWorkspace(
      account,
      validatedRequestParams.data.workspaceId,
      validatedRequestBody.data.userEmail,
    );

    if (!response) return forbidden();
    return created(response);
  }
}
