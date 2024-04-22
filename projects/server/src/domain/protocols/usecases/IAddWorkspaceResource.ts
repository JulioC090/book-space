import Resource from '@/domain/models/Resource';

export default interface IAddWorkspaceResource {
  add(
    authenticatedUserId: string,
    workspaceId: string,
    resource: Omit<Resource, 'id'>,
  ): Promise<Resource | null>;
}
