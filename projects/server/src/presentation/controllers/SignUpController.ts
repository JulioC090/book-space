import IAddAccount from '@/domain/protocols/usecases/IAddAccount';
import { badRequest, created } from '@/presentation/helpers/httpCodes';
import { Controller } from '@/presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/Http';
import { z } from 'zod';

const requestBodySchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
});

export default class SignUpController implements Controller {
  private addAccount: IAddAccount;

  constructor(addAccount: IAddAccount) {
    this.addAccount = addAccount;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequest = requestBodySchema.safeParse(request.body);
    if (!validatedRequest.success)
      return badRequest(validatedRequest.error.issues);

    const result = await this.addAccount.add(validatedRequest.data);
    if (!result) return badRequest('Email is already registered');

    return created();
  }
}
