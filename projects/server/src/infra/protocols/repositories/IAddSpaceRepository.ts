import Space from '@/domain/models/Space';

export default interface IAddSpaceRepository {
  add(
    workspaceId: string,
    space: Omit<Space, 'id'>,
    resources?: Array<string>,
  ): Promise<Space | undefined>;
}
