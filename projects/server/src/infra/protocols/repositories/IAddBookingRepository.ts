import Booking from '@/domain/models/Booking';

export default interface IAddBookingRepository {
  addBooking(booking: Omit<Booking, 'id'>): Promise<Booking>;
}
