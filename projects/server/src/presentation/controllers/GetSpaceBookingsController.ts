import ILoadSpaceBookings from '@/domain/protocols/usecases/ILoadSpaceBookings';
import { badRequest, forbidden, ok } from '@/presentation/helpers/httpCodes';
import { Controller } from '@/presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/Http';
import { z } from 'zod';

const requestParamsSchema = z.object({
  spaceId: z.string().min(1),
  day: z.string().date(),
});

export default class GetSpaceBookingsController implements Controller {
  private loadSpaceBookings: ILoadSpaceBookings;

  constructor(loadSpaceBookings: ILoadSpaceBookings) {
    this.loadSpaceBookings = loadSpaceBookings;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const validatedRequestParams = requestParamsSchema.safeParse(
      request.params,
    );
    if (!validatedRequestParams.success)
      return badRequest(validatedRequestParams.error.issues);

    const { accountId } = request as { accountId: string };

    const bookings = await this.loadSpaceBookings.load(
      accountId,
      validatedRequestParams.data.spaceId,
      new Date(validatedRequestParams.data.day),
    );

    if (!bookings) return forbidden();
    return ok(bookings);
  }
}
