import Booking from '@/domain/models/Booking';
import ILoadBookings from '@/domain/protocols/usecases/ILoadBookings';
import ILoadBookingsRepository from '@/infra/protocols/repositories/ILoadBookingsRepository';

export default class LoadBookings implements ILoadBookings {
  private loadBookingsRepository: ILoadBookingsRepository;

  constructor(loadBookingsRepository: ILoadBookingsRepository) {
    this.loadBookingsRepository = loadBookingsRepository;
  }

  async loadAll(authenticatedUserId: string): Promise<Array<Booking>> {
    return await this.loadBookingsRepository.loadAll(authenticatedUserId);
  }
}
