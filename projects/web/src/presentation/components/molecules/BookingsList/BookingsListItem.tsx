import Booking from '@/models/Booking';
import Card from '@/presentation/components/atoms/Card';
import toTime from '@/presentation/utils/toTime';

interface BookingsListItemProps {
  booking: Required<Booking>;
}

export default function BookingsListItem({ booking }: BookingsListItemProps) {
  return (
    <li>
      <Card className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-8 items-center">
            <span className="text-md">
              {booking.space.workspace!.tag}/{booking.space.name}
            </span>
          </div>
          <p className="text-sm text-zinc-200">{booking.space.description}</p>
        </div>
        <div>
          <span className="text-md text-zinc-100">
            {toTime(booking.startTime.toString())} das{' '}
            {toTime(booking.endTime.toString())}
          </span>
        </div>
      </Card>
    </li>
  );
}
