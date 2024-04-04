export default interface IDeleteUserInWorkspaceRepository {
  deleteUserInWorkspace(workspaceId: string, userId: string): Promise<boolean>;
}
