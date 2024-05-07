import SpaceAvailability from '@/domain/models/SpaceAvailability';

export default interface ILoadSpaceAvailabilityRepository {
  loadSpaceAvailability(spaceId: string): Promise<Array<SpaceAvailability>>;
}
