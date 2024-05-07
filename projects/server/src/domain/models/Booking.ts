export default interface Booking {
  id: string;
  userId: string;
  spaceId: string;
  day: Date;
  startTime: Date;
  endTime: Date;
}
