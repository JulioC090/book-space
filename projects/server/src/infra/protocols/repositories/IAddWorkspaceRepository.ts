import Workspace from 'domain/models/Workspace';

export type IAddWorkspaceRepositoryInput = Omit<
  Omit<Workspace, 'spaces'>,
  'id' | 'role' | 'users'
>;
export type IAddWorkspaceRepositoryOutput = { workspaceId: string };

export default interface IAddWorkspaceRepository {
  add(
    workspace: IAddWorkspaceRepositoryInput,
  ): Promise<IAddWorkspaceRepositoryOutput>;
}
