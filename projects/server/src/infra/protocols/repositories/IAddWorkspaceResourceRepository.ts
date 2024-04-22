import Resource from '@/domain/models/Resource';

export default interface IAddWorkspaceResourceRepository {
  add(
    workspaceId: string,
    resource: Omit<Resource, 'id'>,
  ): Promise<Resource | null>;
}
