import clsx from 'clsx';

interface GridListProps {
  children: React.ReactNode;
  className?: string;
}

export default function GridList({ children, className }: GridListProps) {
  return (
    <div
      className={clsx(
        'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-8',
        className,
      )}
    >
      {children}
    </div>
  );
}
