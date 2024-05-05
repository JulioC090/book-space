export default function timeToDateConverter(time: string): Date {
  const subTimeParts = time.split(':');

  const date = new Date();
  date.setHours(parseInt(subTimeParts[0], 10));
  date.setMinutes(parseInt(subTimeParts[1], 10));
  date.setSeconds(parseInt(subTimeParts[2], 10));

  return date;
}
