/* eslint-disable no-unused-vars */

import { WorkspaceRoles } from '@/models/WorkspaceRoles';

export interface IAddUserInWorkspaceGatewayOutput {
  id: string;
  name: string;
  email: string;
}

export default interface IAddUserInWorkspaceGateway {
  addUser(
    workspaceId: string,
    userEmail: string,
    role: WorkspaceRoles,
  ): Promise<IAddUserInWorkspaceGatewayOutput | undefined>;
}
