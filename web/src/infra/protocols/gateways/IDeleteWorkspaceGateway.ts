/* eslint-disable no-unused-vars */
export default interface IDeleteWorkspace {
  delete(workspaceId: string): Promise<boolean>;
}
