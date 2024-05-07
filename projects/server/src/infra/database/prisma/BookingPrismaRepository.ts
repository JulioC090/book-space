import Booking from '@/domain/models/Booking';
import { prisma } from '@/infra/database/prisma/prismaClient';
import IAddBookingRepository from '@/infra/protocols/repositories/IAddBookingRepository';
import ILoadBookingsByDayRepository from '@/infra/protocols/repositories/ILoadBookingsByDayRepository';

export default class BookingPrismaRepository
  implements ILoadBookingsByDayRepository, IAddBookingRepository
{
  async loadBookingsByDay(spaceId: string, day: Date): Promise<Booking[]> {
    const bookings = await prisma.booking.findMany({
      where: { AND: [{ spaceId }, { day }] },
    });
    return bookings;
  }

  async addBooking(booking: Omit<Booking, 'id'>): Promise<Booking> {
    const addedBooking = await prisma.booking.create({
      data: {
        ...booking,
      },
    });
    return {
      id: addedBooking.id,
      userId: addedBooking.userId,
      spaceId: addedBooking.spaceId,
      day: addedBooking.day,
      startTime: addedBooking.startTime,
      endTime: addedBooking.endTime,
    };
  }
}
