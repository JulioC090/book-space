import Booking from '@/domain/models/Booking';
import IAddBook from '@/domain/protocols/usecases/IAddBook';
import IAddBookingRepository from '@/infra/protocols/repositories/IAddBookingRepository';
import ICheckUserSpaceAccessRepository from '@/infra/protocols/repositories/ICheckUserSpaceAccessRepository';
import ILoadBookingsByDayRepository from '@/infra/protocols/repositories/ILoadBookingsByDayRepository';
import ILoadSpaceAvailabilityRepository from '@/infra/protocols/repositories/ILoadSpaceAvailabilityRepository';

export default class AddBook implements IAddBook {
  private checkUserSpaceAccessRepository: ICheckUserSpaceAccessRepository;
  private loadSpaceAvailabilityRepository: ILoadSpaceAvailabilityRepository;
  private loadBookingsByDayRepository: ILoadBookingsByDayRepository;
  private addBookRepository: IAddBookingRepository;

  constructor(
    checkUserSpaceAccessRepository: ICheckUserSpaceAccessRepository,
    loadSpaceAvailabilityRepository: ILoadSpaceAvailabilityRepository,
    loadBookingsByDayRepository: ILoadBookingsByDayRepository,
    addBookRepository: IAddBookingRepository,
  ) {
    this.checkUserSpaceAccessRepository = checkUserSpaceAccessRepository;
    this.loadSpaceAvailabilityRepository = loadSpaceAvailabilityRepository;
    this.loadBookingsByDayRepository = loadBookingsByDayRepository;
    this.addBookRepository = addBookRepository;
  }

  async add(
    authenticatedUserId: string,
    spaceId: string,
    book: { day: Date; startTime: Date; endTime: Date },
  ): Promise<Booking | null> {
    book.day.setHours(24);
    if (book.day.getTime() < Date.now()) return null;

    if (
      !(await this.checkUserSpaceAccessRepository.verifyUserAccess(
        authenticatedUserId,
        spaceId,
      ))
    )
      return null;

    const spaceAvailability =
      await this.loadSpaceAvailabilityRepository.loadSpaceAvailability(spaceId);

    let isAvailable = true;

    if (spaceAvailability.length > 0) {
      const weekDayAvailability = spaceAvailability.find(
        (avail) => avail.weekday === book.day.getDay(),
      );

      if (
        !weekDayAvailability ||
        weekDayAvailability.startTime.getTime() > book.startTime.getTime() ||
        weekDayAvailability.endTime.getTime() < book.endTime.getTime()
      ) {
        isAvailable = false;
      }
    }

    if (!isAvailable) return null;

    const bookings = await this.loadBookingsByDayRepository.loadBookingsByDay(
      spaceId,
      book.day,
    );

    const hasTimeConflict =
      bookings.length === 0
        ? false
        : bookings.some(
            (existingBooking) =>
              existingBooking.startTime <= book.endTime &&
              existingBooking.endTime >= book.startTime,
          );

    if (hasTimeConflict) return null;

    const booking = await this.addBookRepository.addBooking({
      userId: authenticatedUserId,
      spaceId,
      ...book,
    });
    return booking;
  }
}
