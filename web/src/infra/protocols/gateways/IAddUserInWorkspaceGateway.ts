/* eslint-disable no-unused-vars */
export default interface IAddUserInWorkspaceGateway {
  addUser(workspaceId: string, userEmail: string): Promise<boolean>;
}
