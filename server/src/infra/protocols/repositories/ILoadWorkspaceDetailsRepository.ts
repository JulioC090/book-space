import Workspace from 'domain/models/Workspace';

export default interface ILoadWorkspaceDetailsRepository {
  loadWorkspaceDetails(
    workspaceId: string,
  ): Promise<Required<Omit<Workspace, 'role'>> | null>;
}
