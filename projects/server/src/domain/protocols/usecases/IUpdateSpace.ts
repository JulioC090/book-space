import Space from '@/domain/models/Space';

export default interface IUpdateSpace {
  update(
    authenticatedUserId: string,
    workspaceId: string,
    spaceId: string,
    partialSpace: Partial<Omit<Space, 'id' | 'workspaceId'>>,
  ): Promise<boolean>;
}
