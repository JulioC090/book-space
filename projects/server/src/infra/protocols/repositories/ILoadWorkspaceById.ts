import Workspace from 'domain/models/Workspace';

export default interface ILoadWorkspaceById {
  loadById(workspaceId: string): Promise<Omit<Workspace, 'role'> | null>;
}
