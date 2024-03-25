import UpdateWorkspace from 'domain/usecases/UpdateWorkspace';
import { badRequest, ok } from 'presentation/helpers/httpCodes';
import { Controller } from 'presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
});

const requestBodySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(8),
  tag: z.string().min(1),
});

export default class PatchWorkspaceController implements Controller {
  private updateWorkspace: UpdateWorkspace;

  constructor(updateWorkspace: UpdateWorkspace) {
    this.updateWorkspace = updateWorkspace;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequestParams = requestParamsSchema.safeParse(
      request.params,
    );
    if (!validatedRequestParams.success)
      return badRequest(validatedRequestParams.error.issues);

    const validatedRequestBody = requestBodySchema
      .partial()
      .safeParse(request.body);

    if (!validatedRequestBody.success)
      return badRequest(validatedRequestBody.error.issues);

    if (Object.keys(validatedRequestBody.data).length === 0)
      return badRequest({ error: 'Invalid body' });

    const { accountId } = request as { accountId: string };

    const response = await this.updateWorkspace.update(
      accountId,
      validatedRequestParams.data.workspaceId,
      validatedRequestBody.data,
    );

    if (!response) return badRequest({ error: 'Invalid workspace id' });
    return ok();
  }
}
