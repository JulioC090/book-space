import WorkspaceService from '@/infra/services/WorkspaceService';
import { makeWorkspaceGateway } from '@/main/factories/gateways/WorkspaceGateway';

const workspaceGateway = makeWorkspaceGateway();

export const makeWorkspaceService = () =>
  new WorkspaceService(
    workspaceGateway,
    workspaceGateway,
    workspaceGateway,
    workspaceGateway,
    workspaceGateway,
  );
