export default interface ICheckUserExistInWorkspaceRepository {
  checkUserInWorkspace(workspaceId: string, userId: string): Promise<boolean>;
}
