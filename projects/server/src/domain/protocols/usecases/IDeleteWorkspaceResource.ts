export default interface IDeleteWorkspaceResource {
  delete(
    authenticatedUserId: string,
    workspaceId: string,
    resourceId: string,
  ): Promise<boolean>;
}
