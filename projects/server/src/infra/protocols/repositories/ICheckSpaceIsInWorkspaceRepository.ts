export default interface ICheckSpaceIsInWorkspaceRepository {
  isInWorkspace(workspaceId: string, spaceId: string): Promise<boolean>;
}
