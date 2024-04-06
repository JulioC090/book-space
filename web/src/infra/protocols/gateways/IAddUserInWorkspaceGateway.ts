/* eslint-disable no-unused-vars */

export interface IAddUserInWorkspaceGatewayOutput {
  id: string;
  name: string;
  email: string;
}

export default interface IAddUserInWorkspaceGateway {
  addUser(
    workspaceId: string,
    userEmail: string,
  ): Promise<IAddUserInWorkspaceGatewayOutput | undefined>;
}
