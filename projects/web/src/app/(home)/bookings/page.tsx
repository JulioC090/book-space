'use client';

import Container from '@/presentation/components/atoms/Container';
import BookingsList from '@/presentation/components/molecules/BookingsList';
import ListTemplate from '@/presentation/components/templates/ListTemplate';
import useBookings from '@/presentation/hooks/useBookings';
import { useEffect } from 'react';

export default function BookingsPage() {
  const { bookings, loadAll } = useBookings();

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <Container>
      <ListTemplate
        title={<h1 className="text-2xl font-bold pt-8">Agendamentos</h1>}
        list={<BookingsList data={bookings} />}
      />
    </Container>
  );
}
