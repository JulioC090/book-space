import { Workspace } from '@/models/Workspace';

export default interface IUpdateWorkspaceGateway {
  update(
    workspaceId: string,
    workspace: Omit<Workspace, 'id' | 'role'>,
  ): Promise<boolean>;
}
