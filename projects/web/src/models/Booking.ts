import Space from '@/models/Space';

export default interface Booking {
  id?: string;
  day: Date | string;
  startTime: Date | string;
  endTime: Date | string;
  space?: Space;
}
