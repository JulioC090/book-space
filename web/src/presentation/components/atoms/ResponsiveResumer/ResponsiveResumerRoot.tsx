import {
  Size,
  SizeTriggerProvider,
} from '@/presentation/components/atoms/ResponsiveResumer/context/SizeTriggerContext';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import React from 'react';

interface ResponsiveResumerProps {
  sizeTrigger?: Size;
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export default function ResponsiveResumerRoot({
  sizeTrigger,
  children,
  asChild,
  className,
}: ResponsiveResumerProps) {
  const Comp = asChild ? Slot : 'div';

  return (
    <SizeTriggerProvider size={sizeTrigger}>
      <Comp
        className={clsx({ 'flex gap-4 justify-center': !asChild }, className)}
      >
        {children}
      </Comp>
    </SizeTriggerProvider>
  );
}
