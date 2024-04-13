/* eslint-disable no-unused-vars */
export default interface IDeleteWorkspaceGateway {
  delete(workspaceId: string): Promise<boolean>;
}
