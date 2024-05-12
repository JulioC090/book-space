import Booking from '@/domain/models/Booking';

export default interface ILoadBookingsRepository {
  loadAll(accountId: string): Promise<Array<Booking>>;
}
