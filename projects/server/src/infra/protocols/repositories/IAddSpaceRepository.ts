import Space from '@/domain/models/Space';

export default interface IAddSpaceRepository {
  add(
    workspaceId: string,
    space: Omit<Space, 'id'>,
  ): Promise<Space | undefined>;
}
