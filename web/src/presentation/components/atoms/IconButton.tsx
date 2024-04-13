import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ children, className, ...rest }, ref) => (
    <button
      className={clsx(
        'rounded outline-none hover:bg-zinc-800 focus:bg-zinc-800 focus:ring-2 ring-zinc-200',
        className,
      )}
      {...rest}
      ref={ref}
    >
      <Slot className="size-8 p-2">{children}</Slot>
    </button>
  ),
);

IconButton.displayName = 'IconButton';
