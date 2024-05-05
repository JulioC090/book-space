import Resource from '@/domain/models/Resource';
import SpaceAvailability from '@/domain/models/SpaceAvailability';

export default interface Space {
  id: string;
  workspaceId?: string;
  name: string;
  description: string;
  maxAmountOfPeople?: number | null;
  resources?: Array<Resource> | Array<{ resourceId: string }>;
  availabilityRange: Array<SpaceAvailability>;
}
