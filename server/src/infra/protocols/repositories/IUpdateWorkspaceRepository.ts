import Workspace from 'domain/models/Workspace';

export default interface IUpdateWorkspaceRepository {
  update(
    userId: string,
    workspaceId: string,
    partialWorkspace: Partial<Omit<Workspace, 'id'>>,
  ): Promise<boolean>;
}
