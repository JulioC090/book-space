import { User } from '@/domain/models/User';
import IUpdateSpace from '@/domain/protocols/usecases/IUpdateSpace';
import { badRequest, forbidden, ok } from '@/presentation/helpers/httpCodes';
import { Controller } from '@/presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  workspaceId: z.string().min(1),
  spaceId: z.string().min(1),
});

const requestBodySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  maxAmountOfPeople: z.number().positive().nullable().optional(),
});

export default class PatchSpaceController implements Controller {
  private updateSpace: IUpdateSpace;

  constructor(updateSpace: IUpdateSpace) {
    this.updateSpace = updateSpace;
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

    const { account } = request as { account: User };

    const response = await this.updateSpace.update(
      account.id,
      validatedRequestParams.data.workspaceId,
      validatedRequestParams.data.spaceId,
      validatedRequestBody.data,
    );

    if (!response) return forbidden();
    return ok();
  }
}
