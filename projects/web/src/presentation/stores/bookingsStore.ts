import Booking from '@/models/Booking';
import { atom } from 'recoil';

export const bookingsStore = atom<Array<Required<Booking>>>({
  key: 'bookingsStore',
  default: [],
});
