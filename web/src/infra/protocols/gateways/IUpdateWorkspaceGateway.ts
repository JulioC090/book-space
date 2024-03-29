/* eslint-disable no-unused-vars */
import { Workspace } from '@/models/Workspace';

export default interface IUpdateWorkspaceGateway {
  update(
    workspaceId: string,
    workspace: Omit<Workspace, 'id'>,
  ): Promise<boolean>;
}
