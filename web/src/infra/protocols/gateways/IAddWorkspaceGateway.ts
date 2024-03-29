/* eslint-disable no-unused-vars */
import { Workspace } from '@/models/Workspace';

export default interface IAddWorkspaceGateway {
  add(workspace: Omit<Workspace, 'id'>): Promise<boolean>;
}
