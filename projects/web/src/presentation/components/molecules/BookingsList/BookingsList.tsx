import Booking from '@/models/Booking';
import withEmptyMessage from '@/presentation/components/hoc/withEmptyMessage';
import BookingsListEmpty from '@/presentation/components/molecules/BookingsList/BookingsListEmpty';
import BookingsListItem from '@/presentation/components/molecules/BookingsList/BookingsListItem';

interface BookingsListProps {
  data: Array<Required<Booking>>;
}

const formatDate = (date: string) => {
  const eventDate = new Date(date);
  eventDate.setDate(eventDate.getDate() + 1);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (
    eventDate.getDate() === today.getDate() &&
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getFullYear() === today.getFullYear()
  ) {
    return 'Hoje';
  } else if (
    eventDate.getDate() === tomorrow.getDate() &&
    eventDate.getMonth() === tomorrow.getMonth() &&
    eventDate.getFullYear() === tomorrow.getFullYear()
  ) {
    return 'Amanhã';
  } else {
    return eventDate.toLocaleDateString('pt-BR');
  }
};

const groupBookingsByDay = (bookings: Array<Required<Booking>>) => {
  const groupedBookings: { [key: string]: Array<Required<Booking>> } = {};

  bookings.forEach((bookings) => {
    const date = formatDate(bookings.day as string);
    if (!groupedBookings[date]) {
      groupedBookings[date] = [];
    }
    groupedBookings[date].push(bookings);
  });

  return groupedBookings;
};

function BookingsList({ data }: BookingsListProps) {
  const groupedBookings = groupBookingsByDay(data);

  return (
    <div>
      {Object.entries(groupedBookings).map(([date, bookings], index) => (
        <details key={index} open={date === 'Hoje'}>
          <summary className="text-zinc-200 text-md font-bold mb-2">
            {date}
          </summary>
          <ul className="mb-8 flex flex-col gap-2">
            {bookings.map((booking) => (
              <BookingsListItem key={booking.id} booking={booking} />
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}

export default withEmptyMessage(BookingsList, BookingsListEmpty);
