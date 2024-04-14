export default interface IDeleteWorkspaceGateway {
  delete(workspaceId: string): Promise<boolean>;
}
