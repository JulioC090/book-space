/* eslint-disable no-unused-vars */
import { Workspace } from '@/models/Workspace';

export default interface IWorkspaceService {
  loadAll(): Promise<Array<Workspace>>;
  load(workspaceId: string): Promise<Required<Workspace> | undefined>;
  add(workspace: Omit<Workspace, 'id' | 'role'>): Promise<string | undefined>;
  update(
    workspaceId: string,
    partialWorkspace: Omit<Workspace, 'id' | 'role'>,
  ): Promise<boolean>;
  delete(workspaceId: string): Promise<boolean>;
}
