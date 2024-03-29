import AddWorkspace from 'domain/usecases/AddWorkspace';
import {
  badRequest,
  created,
  internalServerError,
} from 'presentation/helpers/httpCodes';
import { Controller } from 'presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';
import { z } from 'zod';

const requestBodySchema = z.object({
  name: z.string().min(2),
  tag: z.string().min(2),
});

export default class PostWorkspaceController implements Controller {
  private addWorkspace: AddWorkspace;

  constructor(addWorkspace: AddWorkspace) {
    this.addWorkspace = addWorkspace;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequest = requestBodySchema.safeParse(request.body);
    if (!validatedRequest.success)
      return badRequest(validatedRequest.error.issues);

    const { accountId } = request as { accountId: string };

    const response = await this.addWorkspace.add({
      ...validatedRequest!.data,
      ownerId: accountId,
    });

    if (!response) return internalServerError();
    return created(response);
  }
}
