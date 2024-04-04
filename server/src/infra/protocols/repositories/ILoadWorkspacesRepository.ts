import Workspace from 'domain/models/Workspace';

export type ILoadWorkspacesRepositoryOutput = Array<Omit<Workspace, 'role'>>;

export default interface ILoadWorkspacesRepository {
  load(userId: string): Promise<ILoadWorkspacesRepositoryOutput>;
}
