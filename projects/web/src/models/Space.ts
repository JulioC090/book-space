import { Resource } from '@/models/Resource';

export default interface Space {
  id: string;
  name: string;
  description: string;
  maxAmountOfPeople?: number | null;
  resources?: Array<Resource>;
}
