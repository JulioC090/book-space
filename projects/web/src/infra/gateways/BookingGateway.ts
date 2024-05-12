import IBookingGateway from '@/infra/protocols/gateways/IBookingGateway';
import IHttpClient from '@/infra/protocols/http/IHttpClient';
import Booking from '@/models/Booking';

export default class BookingGateway implements IBookingGateway {
  private httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  async loadAll(): Promise<Required<Booking>[]> {
    const response = await this.httpClient.get<Array<Required<Booking>>>({
      url: '/bookings',
    });

    return response.body!;
  }
}
