export default interface IDeleteWorkspaceRepository {
  delete(workspaceId: string): Promise<boolean>;
}
