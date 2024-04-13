import Authentication from 'domain/usecases/Authentication';
import { badRequest, ok, unauthorized } from 'presentation/helpers/httpCodes';
import { Controller } from 'presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from 'presentation/protocols/Http';
import { z } from 'zod';

const requestBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export default class SignInController implements Controller {
  private authentication: Authentication;

  constructor(authentication: Authentication) {
    this.authentication = authentication;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequest = requestBodySchema.safeParse(request.body);
    if (!validatedRequest.success)
      return badRequest(validatedRequest.error.issues);

    const result = await this.authentication.auth(validatedRequest.data);
    if (result === null) return unauthorized();

    return ok(result);
  }
}
