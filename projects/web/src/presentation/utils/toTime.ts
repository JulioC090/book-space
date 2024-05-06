import { timeRegex } from '@/presentation/utils/patterns';

export default function toTime(value: string): string {
  return timeRegex.test(value)
    ? value
    : new Date(value).toTimeString().substring(0, 5);
}
