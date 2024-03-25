import Workspace from 'domain/models/Workspace';

export type ILoadWorkspacesRepositoryOutput = Array<Workspace>;

export default interface ILoadWorkspacesRepository {
  load(userId: string): Promise<ILoadWorkspacesRepositoryOutput>;
}
