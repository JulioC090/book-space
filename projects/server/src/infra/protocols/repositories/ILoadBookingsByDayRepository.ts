import Booking from '@/domain/models/Booking';

export default interface ILoadBookingsByDayRepository {
  loadBookingsByDay(spaceId: string, day: Date): Promise<Array<Booking>>;
}
