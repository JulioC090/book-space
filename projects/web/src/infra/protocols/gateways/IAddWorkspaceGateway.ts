import { Workspace } from '@/models/Workspace';

export type IAddWorkspaceGatewayOutput =
  | {
      workspaceId: string;
    }
  | undefined;

export default interface IAddWorkspaceGateway {
  add(
    workspace: Omit<Workspace, 'id' | 'role'>,
  ): Promise<IAddWorkspaceGatewayOutput>;
}
