import WorkspaceUserService from '@/infra/services/WorkspaceUserService';
import { makeWorkspaceGateway } from '@/main/factories/gateways/WorkspaceGatewayFactory';

const workspaceGateway = makeWorkspaceGateway();

export const makeWorkspaceUserService = () =>
  new WorkspaceUserService(
    workspaceGateway,
    workspaceGateway,
    workspaceGateway,
    workspaceGateway,
  );
