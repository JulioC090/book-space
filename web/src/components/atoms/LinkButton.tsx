import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef } from 'react';

interface LinkButtonProps {
  variant?: 'primary' | 'unstyled';
  href: string;
  children: React.ReactNode;
  className?: string;
}

const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    { variant = 'primary', href, children, className }: LinkButtonProps,
    ref,
  ) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={clsx(
          'inline-flex flex-row items-center gap-2 rounded ',
          {
            'text-green-haze-600 hover:text-green-500 focus:text-green-500':
              variant === 'primary',
            'default-focus': variant !== 'unstyled',
          },
          className,
        )}
      >
        {children}
      </Link>
    );
  },
);

LinkButton.displayName = 'LinkButton';

export default LinkButton;
