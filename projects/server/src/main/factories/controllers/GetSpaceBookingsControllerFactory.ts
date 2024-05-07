import LoadSpaceBookings from '@/domain/usecases/LoadSpaceBookings';
import BookingPrismaRepository from '@/infra/database/prisma/BookingPrismaRepository';
import SpacePrismaRepository from '@/infra/database/prisma/SpacePrismaRepository';
import GetSpaceBookingsController from '@/presentation/controllers/GetSpaceBookingsController';

export const makeGetSpaceBookingsController = () => {
  const spaceRepository = new SpacePrismaRepository();
  const bookingRepository = new BookingPrismaRepository();
  const loadSpaceBookings = new LoadSpaceBookings(
    spaceRepository,
    bookingRepository,
  );
  return new GetSpaceBookingsController(loadSpaceBookings);
};
