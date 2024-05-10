import { Resource } from '@/models/Resource';
import { SpaceAvailability } from '@/models/SpaceAvailability';
import { Workspace } from '@/models/Workspace';

export default interface Space {
  id: string;
  name: string;
  description: string;
  maxAmountOfPeople?: number | null;
  resources?: Array<Resource>;
  availabilityRange?: Array<SpaceAvailability>;
  workspace?: Omit<Workspace, 'role'>;
}
