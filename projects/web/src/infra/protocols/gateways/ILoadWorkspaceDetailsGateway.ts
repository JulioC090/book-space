/* eslint-disable no-unused-vars */
import { Workspace } from '@/models/Workspace';

export default interface ILoadWorkspaceDetailsGateway {
  loadWorkspaceDetails(
    workspaceId: string,
  ): Promise<Required<Workspace> | undefined>;
}
