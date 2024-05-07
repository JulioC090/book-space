import Space from '@/domain/models/Space';

export default interface ILoadUserSpacesRepository {
  loadUserSpaces(userId: string): Promise<Array<Space>>;
}
