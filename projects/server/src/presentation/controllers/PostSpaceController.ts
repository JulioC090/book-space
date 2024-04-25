import { User } from '@/domain/models/User';
import AddSpace from '@/domain/usecases/AddSpace';
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
  description: z.string().min(2),
  maxAmountOfPeople: z.number().positive().optional(),
  resources: z.array(z.string()).optional(),
});

export default class PostSpaceController implements Controller {
  private addSpace: AddSpace;

  constructor(addSpace: AddSpace) {
    this.addSpace = addSpace;
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

    const response = await this.addSpace.add(
      account,
      validatedRequestParams.data.workspaceId,
      {
        name: validatedRequestBody.data.name,
        description: validatedRequestBody.data.description,
        maxAmountOfPeople: validatedRequestBody.data.maxAmountOfPeople,
      },
      validatedRequestBody.data.resources,
    );

    if (!response) return forbidden();
    return created(response);
  }
}
