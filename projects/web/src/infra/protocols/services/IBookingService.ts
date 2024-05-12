import Booking from '@/models/Booking';

export default interface IBookingService {
  loadAll(): Promise<Array<Required<Booking>>>;
}
