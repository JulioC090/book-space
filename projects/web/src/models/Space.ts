import { Resource } from '@/models/Resource';
import { SpaceAvailability } from '@/models/SpaceAvailability';

export default interface Space {
  id: string;
  name: string;
  description: string;
  maxAmountOfPeople?: number | null;
  resources?: Array<Resource>;
  availabilityRange?: Array<SpaceAvailability>;
}
