import Space from '@/domain/models/Space';

export default interface IUpdateSpaceRepository {
  update(
    spaceId: string,
    partialSpace: Partial<Omit<Space, 'id' | 'workspaceId'>>,
    resources?: Array<string>,
  ): Promise<boolean>;
}
