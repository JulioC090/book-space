import Space from '@/models/Space';

export default interface ISpaceService {
  loadAll(): Promise<Array<Required<Space>>>;
  add(
    workspaceId: string,
    space: Omit<Space, 'id'>,
    resources?: Array<string>,
  ): Promise<Space | null>;
  update(
    workspaceId: string,
    spaceId: string,
    partialSpace: Partial<Omit<Space, 'id'>>,
    resources?: Array<string>,
  ): Promise<boolean>;
  delete(workspaceId: string, spaceId: string): Promise<boolean>;
}
