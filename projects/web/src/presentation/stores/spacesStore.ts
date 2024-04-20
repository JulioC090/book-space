import Space from '@/models/Space';
import { atom } from 'recoil';

export const spacesStore = atom<Array<Space>>({
  key: 'spacesStore',
  default: [],
});
