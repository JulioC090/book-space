export default interface IAddUserToWorkspaceRepository {
  addUserToWorkspace(workspaceId: string, userId: string): Promise<boolean>;
}
