import { User } from '@/domain/models/User';
import IDeleteWorkspaceResource from '@/domain/protocols/usecases/IDeleteWorkspaceResource';
import { badRequest, forbidden, ok } from '@/presentation/helpers/httpCodes';
import { Controller } from '@/presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
  resourceId: z.string().min(1),
});

export default class DeleteWorkspaceResourceController implements Controller {
  private deleteWorkspaceResource: IDeleteWorkspaceResource;

  constructor(deleteWorkspaceResource: IDeleteWorkspaceResource) {
    this.deleteWorkspaceResource = deleteWorkspaceResource;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequestParams = requestParamsSchema.safeParse(
      request.params,
    );
    if (!validatedRequestParams.success)
      return badRequest(validatedRequestParams.error.issues);

    const { account } = request as { account: User };

    const response = await this.deleteWorkspaceResource.delete(
      account.id,
      validatedRequestParams.data.workspaceId,
      validatedRequestParams.data.resourceId,
    );
    if (!response) return forbidden();
    return ok();
  }
}
