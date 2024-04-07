import {
  Size,
  SizeTriggerContext,
} from '@/components/atoms/ResponsiveResumer/context/SizeTriggerContext';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { useContext } from 'react';

interface ResponsiveResumerHiddenProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
  sizeTrigger?: Size;
}

export default function ResponsiveResumerHidden({
  sizeTrigger,
  children,
  asChild,
  className,
}: ResponsiveResumerHiddenProps) {
  const Comp = asChild ? Slot : 'div';
  const sizeTriggerContext = useContext(SizeTriggerContext);
  const size = sizeTrigger ? sizeTrigger : sizeTriggerContext;

  return (
    <Comp
      className={clsx(
        'hidden',
        {
          'sm:block': size === 'sm',
          'md:block': size === 'md',
          'lg:block': size === 'lg',
        },
        className,
      )}
    >
      {children}
    </Comp>
  );
}
