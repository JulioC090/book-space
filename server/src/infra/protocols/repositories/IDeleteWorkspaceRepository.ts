export default interface IDeleteWorkspaceRepository {
  delete(userId: string, workspaceId: string): Promise<boolean>;
}
