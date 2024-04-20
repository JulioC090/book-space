import Space from '@/models/Space';

export default interface ISpaceGateway {
  add(workspaceId: string, space: Omit<Space, 'id'>): Promise<Space | null>;
  update(
    workspaceId: string,
    spaceId: string,
    partialSpace: Partial<Omit<Space, 'id'>>,
  ): Promise<boolean>;
  delete(workspaceId: string, spaceId: string): Promise<boolean>;
}
