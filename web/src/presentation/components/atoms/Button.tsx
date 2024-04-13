import clsx from 'clsx';
import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={clsx(
        'bg-green-haze-600 text-zinc-200 px-4 py-2 rounded min-w-fit hover:bg-green-haze-500 default-focus focus:bg-green-haze-500',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
