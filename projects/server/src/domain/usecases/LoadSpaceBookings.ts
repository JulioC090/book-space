import Booking from '@/domain/models/Booking';
import ILoadSpaceBookings from '@/domain/protocols/usecases/ILoadSpaceBookings';
import ICheckUserSpaceAccessRepository from '@/infra/protocols/repositories/ICheckUserSpaceAccessRepository';
import ILoadBookingsByDayRepository from '@/infra/protocols/repositories/ILoadBookingsByDayRepository';

export default class LoadSpaceBookings implements ILoadSpaceBookings {
  private checkUserSpaceAccessRepository: ICheckUserSpaceAccessRepository;
  private loadBookingsByDayRepository: ILoadBookingsByDayRepository;

  constructor(
    checkUserSpaceAccessRepository: ICheckUserSpaceAccessRepository,
    loadBookingsByDayRepository: ILoadBookingsByDayRepository,
  ) {
    this.checkUserSpaceAccessRepository = checkUserSpaceAccessRepository;
    this.loadBookingsByDayRepository = loadBookingsByDayRepository;
  }

  async load(
    authenticatedUserId: string,
    spaceId: string,
    day: Date,
  ): Promise<Omit<Booking, 'day' | 'spaceId'>[] | null> {
    day.setHours(24);

    if (
      !(await this.checkUserSpaceAccessRepository.verifyUserAccess(
        authenticatedUserId,
        spaceId,
      ))
    )
      return null;

    const bookings = await this.loadBookingsByDayRepository.loadBookingsByDay(
      spaceId,
      day,
    );

    return bookings.map((booking) => ({
      id: booking.id,
      userId: booking.userId,
      startTime: booking.startTime,
      endTime: booking.endTime,
    }));
  }
}
