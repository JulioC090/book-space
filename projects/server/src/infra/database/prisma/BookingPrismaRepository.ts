import Booking from '@/domain/models/Booking';
import ILoadBookings from '@/domain/protocols/usecases/ILoadBookings';
import { prisma } from '@/infra/database/prisma/prismaClient';
import IAddBookingRepository from '@/infra/protocols/repositories/IAddBookingRepository';
import ILoadBookingsByDayRepository from '@/infra/protocols/repositories/ILoadBookingsByDayRepository';

export default class BookingPrismaRepository
  implements ILoadBookings, ILoadBookingsByDayRepository, IAddBookingRepository
{
  async loadAll(accountId: string): Promise<Booking[]> {
    const bookings = await prisma.booking.findMany({
      where: {
        AND: [{ userId: accountId }, { startTime: { gte: new Date() } }],
      },
      orderBy: [{ day: 'asc' }, { startTime: 'asc' }],
      include: {
        Space: {
          include: {
            Workspace: true,
          },
        },
      },
    });

    return bookings.map((booking) => ({
      id: booking.id,
      userId: booking.userId,
      spaceId: booking.spaceId,
      space: {
        id: booking.Space.id,
        name: booking.Space.name,
        description: booking.Space.description,
        workspace: {
          id: booking.Space.Workspace.id,
          name: booking.Space.Workspace.name,
          tag: booking.Space.Workspace.tag,
        },
      },
      day: booking.day,
      startTime: booking.startTime,
      endTime: booking.endTime,
    }));
  }

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
