import { User } from '@/domain/models/User';
import IAddWorkspaceResource from '@/domain/protocols/usecases/IAddWorkspaceResource';
import {
  badRequest,
  created,
  forbidden,
} from '@/presentation/helpers/httpCodes';
import { Controller } from '@/presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
});

const requestBodySchema = z.object({
  name: z.string().min(2),
});

export default class PostWorkspaceResourceController implements Controller {
  private addWorkspaceResource: IAddWorkspaceResource;

  constructor(addWorkspaceResource: IAddWorkspaceResource) {
    this.addWorkspaceResource = addWorkspaceResource;
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

    const response = await this.addWorkspaceResource.add(
      account.id,
      validatedRequestParams.data.workspaceId,
      validatedRequestBody.data,
    );
    if (!response) return forbidden();
    return created(response);
  }
}
