import clsx from 'clsx';

export interface TextInputRootProps {
  children: React.ReactNode;
  error?: boolean;
}

export default function TextInputWrapper({
  error = false,
  children,
}: TextInputRootProps) {
  return (
    <div
      className={clsx(
        'flex items-center gap-3 h-12 py-4 px-3 rounded border-zinc-800 border-2 bg-zinc-900 w-full hover:bg-zinc-800 hover:border-zinc-700 focus-within:!border-zinc-400 focus-within:bg-zinc-800',
        error && '!border-red-600',
      )}
    >
      {children}
    </div>
  );
}
