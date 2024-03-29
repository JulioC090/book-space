import { Workspace } from '@/models/Workspace';

export default interface ILoadWorkspaceGateway {
  load(): Promise<Array<Workspace>>;
}
