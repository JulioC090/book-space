import { useState } from 'react';

export default function useLocalStorage<T>(
  localStorageKey: string,
  initialValue?: T,
): [T | undefined, (item?: T) => void] {
  const storedItem = localStorage.getItem(localStorageKey);
  const [item, setItem] = useState<T | undefined>(
    storedItem ? JSON.parse(storedItem) : initialValue,
  );

  function setLocal(item?: T): void {
    if (!item) {
      localStorage.removeItem(localStorageKey);
    } else {
      localStorage.setItem(localStorageKey, JSON.stringify(item));
    }
    setItem(item);
  }

  return [item, setLocal];
}
