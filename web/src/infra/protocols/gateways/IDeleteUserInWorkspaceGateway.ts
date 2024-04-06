/* eslint-disable no-unused-vars */
export default interface IDeleteUserInWorkspace {
  deleteUser(workspaceId: string, userEmail: string): Promise<boolean>;
}
