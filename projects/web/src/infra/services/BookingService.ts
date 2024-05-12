import IBookingGateway from '@/infra/protocols/gateways/IBookingGateway';
import IBookingService from '@/infra/protocols/services/IBookingService';
import Booking from '@/models/Booking';

export default class BookingService implements IBookingService {
  private bookingGateway: IBookingGateway;

  constructor(bookingGateway: IBookingGateway) {
    this.bookingGateway = bookingGateway;
  }

  async loadAll(): Promise<Required<Booking>[]> {
    return await this.bookingGateway.loadAll();
  }
}
