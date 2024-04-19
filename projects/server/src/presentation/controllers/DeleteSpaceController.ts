import IDeleteSpace from '@/domain/protocols/usecases/IDeleteSpace';
import { badRequest, forbidden, ok } from '@/presentation/helpers/httpCodes';
import { Controller } from '@/presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/Http';
import { User } from '@prisma/client';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
  spaceId: z.string().min(1),
});

export default class DeleteSpaceController implements Controller {
  private deleteSpace: IDeleteSpace;

  constructor(deleteSpace: IDeleteSpace) {
    this.deleteSpace = deleteSpace;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequestParams = requestParamsSchema.safeParse(
      request.params,
    );
    if (!validatedRequestParams.success)
      return badRequest(validatedRequestParams.error.issues);

    const { account } = request as { account: User };

    const response = await this.deleteSpace.delete(
      account.id,
      validatedRequestParams.data.workspaceId,
      validatedRequestParams.data.spaceId,
    );
    if (!response) return forbidden();

    return ok();
  }
}
