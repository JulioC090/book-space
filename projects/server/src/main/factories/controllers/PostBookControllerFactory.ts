import AddBook from '@/domain/usecases/AddBook';
import BookingPrismaRepository from '@/infra/database/prisma/BookingPrismaRepository';
import SpacePrismaRepository from '@/infra/database/prisma/SpacePrismaRepository';
import PostBookController from '@/presentation/controllers/PostBookController';

export const makePostBookController = () => {
  const spaceRepository = new SpacePrismaRepository();
  const bookingRepository = new BookingPrismaRepository();
  const addBook = new AddBook(
    spaceRepository,
    spaceRepository,
    bookingRepository,
    bookingRepository,
  );
  return new PostBookController(addBook);
};
