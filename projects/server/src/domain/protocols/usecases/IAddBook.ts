import Booking from '@/domain/models/Booking';

export default interface IAddBook {
  add(
    authenticatedUserId: string,
    spaceId: string,
    book: { day: Date; startTime: Date; endTime: Date },
  ): Promise<Booking | null>;
}
