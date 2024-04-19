export default interface IDeleteSpace {
  delete(
    authenticatedUserId: string,
    workspaceId: string,
    spaceId: string,
  ): Promise<boolean>;
}
