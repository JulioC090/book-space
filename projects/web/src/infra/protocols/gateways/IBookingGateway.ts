import Booking from '@/models/Booking';

export default interface IBookingGateway {
  loadAll(): Promise<Array<Required<Booking>>>;
}
