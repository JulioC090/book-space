import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';

interface LinkButtonProps {
  icon?: React.ReactNode;
  variant?: 'primary' | 'unstyled';
  href: string;
  children: React.ReactNode;
  className?: string;
}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    { icon, variant = 'primary', href, children, className }: LinkButtonProps,
    ref,
  ) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={clsx(
          'rounded',
          {
            'text-green-haze-600 hover:text-green-500 focus:text-green-500':
              variant === 'primary',
            'default-focus': variant !== 'unstyled',
          },
          { 'flex flex-row items-center gap-2 p-2': icon },
          className,
        )}
      >
        <Slot>{icon}</Slot>
        {children}
      </Link>
    );
  },
);

LinkButton.displayName = 'LinkButton';

export default LinkButton;
