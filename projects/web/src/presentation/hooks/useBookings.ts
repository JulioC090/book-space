import { makeBookingService } from '@/main/factories/services/BookingServiceFactory';
import { bookingsStore } from '@/presentation/stores/bookingsStore';
import { useRecoilState } from 'recoil';

const bookingService = makeBookingService();

export default function useBookings() {
  const [bookings, setBookings] = useRecoilState(bookingsStore);

  async function loadAll() {
    const bookings = await bookingService.loadAll();
    setBookings(bookings);
  }

  return { bookings, loadAll };
}
