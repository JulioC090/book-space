export default interface ILeaveWorkspaceGateway {
  leave(workspaceId: string): Promise<boolean>;
}
