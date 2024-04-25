import Resource from '@/domain/models/Resource';

export default interface Space {
  id: string;
  workspaceId?: string;
  name: string;
  description: string;
  maxAmountOfPeople?: number | null;
  resources?: Array<Resource> | Array<{ resourceId: string }>;
}
