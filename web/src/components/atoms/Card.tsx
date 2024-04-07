import clsx from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-zinc-900 border-zinc-800 border-2 shadow-sm p-4 rounded relative',
        className,
      )}
    >
      {children}
    </div>
  );
}
