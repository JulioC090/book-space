import ILoadBookings from '@/domain/protocols/usecases/ILoadBookings';
import { ok } from '@/presentation/helpers/httpCodes';
import { Controller } from '@/presentation/protocols/Controller';
import { IHttpRequest, IHttpResponse } from '@/presentation/protocols/Http';

export default class GetBookingsController implements Controller {
  private loadBookings: ILoadBookings;

  constructor(loadBookings: ILoadBookings) {
    this.loadBookings = loadBookings;
  }

  async handle(request: IHttpRequest): Promise<IHttpResponse> {
    const { accountId } = request as { accountId: string };
    const bookings = await this.loadBookings.loadAll(accountId);
    return ok(bookings);
  }
}
