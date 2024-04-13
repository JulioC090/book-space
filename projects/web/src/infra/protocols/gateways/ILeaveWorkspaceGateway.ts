/* eslint-disable no-unused-vars */
export default interface ILeaveWorkspaceGateway {
  leave(workspaceId: string): Promise<boolean>;
}
