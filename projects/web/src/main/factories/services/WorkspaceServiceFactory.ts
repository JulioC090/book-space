import WorkspaceService from '@/infra/services/WorkspaceService';
import { makeWorkspaceGateway } from '@/main/factories/gateways/WorkspaceGatewayFactory';

const workspaceGateway = makeWorkspaceGateway();

export const makeWorkspaceService = () =>
  new WorkspaceService(
    workspaceGateway,
    workspaceGateway,
    workspaceGateway,
    workspaceGateway,
    workspaceGateway,
  );
