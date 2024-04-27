import WorkspaceResourceService from '@/infra/services/WorkspaceResourceService';
import { makeWorkspaceResourceGateway } from '@/main/factories/gateways/WorkspaceResourceFactory';

export const makeWorkspaceResourceService = () => {
  return new WorkspaceResourceService(makeWorkspaceResourceGateway());
};
