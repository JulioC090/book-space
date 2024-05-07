import Booking from '@/domain/models/Booking';

export default interface ILoadSpaceBookings {
  load(
    authenticatedUserId: string,
    spaceId: string,
    day: Date,
  ): Promise<Array<Omit<Booking, 'day' | 'spaceId'>> | null>;
}
