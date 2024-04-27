import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={twMerge(
        clsx(
          'px-2 rounded bg-green-haze-600 text-zinc-200 flex flex-row gap-1 text-sm flex-nowrap text-nowrap',
          className,
        ),
      )}
    >
      {children}
    </span>
  );
}
