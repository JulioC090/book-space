import { createContext } from 'react';

export type Size = 'sm' | 'md' | 'lg';

export const SizeTriggerContext = createContext<Size>('sm');

interface SizeTriggerProviderProps {
  size?: Size;
  children: React.ReactNode;
}

export function SizeTriggerProvider({
  size = 'sm',
  children,
}: SizeTriggerProviderProps) {
  return (
    <SizeTriggerContext.Provider value={size}>
      {children}
    </SizeTriggerContext.Provider>
  );
}
