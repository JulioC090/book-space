import { User } from '@/domain/models/User';
import IAddBook from '@/domain/protocols/usecases/IAddBook';
import {
  badRequest,
  created,
  forbidden,
} from '@/presentation/helpers/httpCodes';
import timeToDateConverter from '@/presentation/helpers/timeToDateConverter';
import { Controller } from '@/presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  spaceId: z.string().min(1),
});

const requestBodySchema = z.object({
  day: z.string().date(),
  startTime: z.string().time(),
  endTime: z.string().time(),
});

export default class PostBookController implements Controller {
  private addBook: IAddBook;

  constructor(addBook: IAddBook) {
    this.addBook = addBook;
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

    const day = new Date(validatedRequestBody.data.day);
    const startTime = timeToDateConverter(validatedRequestBody.data.startTime);
    const endTime = timeToDateConverter(validatedRequestBody.data.endTime);

    if (startTime.getTime() > endTime.getTime())
      return badRequest({ error: 'Invalid time range' });

    const { account } = request as { account: User };

    const response = await this.addBook.add(
      account.id,
      validatedRequestParams.data.spaceId,
      { day, startTime, endTime },
    );

    if (!response) return forbidden();
    return created(response);
  }
}
