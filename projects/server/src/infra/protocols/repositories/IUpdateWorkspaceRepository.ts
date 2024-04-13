import Workspace from 'domain/models/Workspace';

export default interface IUpdateWorkspaceRepository {
  update(
    workspaceId: string,
    partialWorkspace: Partial<Omit<Workspace, 'id'>>,
  ): Promise<boolean>;
}
