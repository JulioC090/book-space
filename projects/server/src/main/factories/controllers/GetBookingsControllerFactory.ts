import LoadBookings from '@/domain/usecases/LoadBookings';
import BookingPrismaRepository from '@/infra/database/prisma/BookingPrismaRepository';
import GetBookingsController from '@/presentation/controllers/GetBookingsController';

export const makeGetBookingsController = () => {
  const bookingRepository = new BookingPrismaRepository();
  const loadBookings = new LoadBookings(bookingRepository);
  return new GetBookingsController(loadBookings);
};
