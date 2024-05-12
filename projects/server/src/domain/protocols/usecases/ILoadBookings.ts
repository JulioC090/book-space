import Booking from '@/domain/models/Booking';

export default interface ILoadBookings {
  loadAll(authenticatedUserId: string): Promise<Array<Booking>>;
}
