import Workspace from 'domain/models/Workspace';

export type IAddWorkspaceRepositoryInput = Omit<Workspace, 'id'>;
export type IAddWorkspaceRepositoryOutput = boolean;

export default interface IAddWorkspaceRepository {
  add(
    workspace: IAddWorkspaceRepositoryInput,
  ): Promise<IAddWorkspaceRepositoryOutput>;
}
