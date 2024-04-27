import { Resource } from '@/models/Resource';

export default interface IWorkspaceResourceGateway {
  add(workspaceId: string, name: string): Promise<Resource | null>;
  remove(workspaceId: string, resourceId: string): Promise<boolean>;
}
