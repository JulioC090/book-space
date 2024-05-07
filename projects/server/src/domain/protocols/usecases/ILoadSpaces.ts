import Space from '@/domain/models/Space';

export default interface ILoadSpaces {
  load(authenticatedUserId: string): Promise<Array<Space>>;
}
