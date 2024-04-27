import { Resource } from '@/models/Resource';

export interface IWorkspaceResourceService {
  add(workspaceId: string, name: string): Promise<Resource | null>;
  remove(workspaceId: string, resourceId: string): Promise<boolean>;
}
