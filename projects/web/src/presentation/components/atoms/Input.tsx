import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, ...rest }, ref) => (
    <div
      className={clsx(
        'flex items-center gap-3 h-12 py-4 px-3 rounded border-zinc-800 border-2 bg-zinc-900 w-full hover:bg-zinc-800 hover:border-zinc-700 focus-within:!border-zinc-400 focus-within:bg-zinc-800',
        error && '!border-red-400',
      )}
    >
      <input
        className="bg-transparent flex-1 text-zinc-100 text-sm placeholder:text-zinc-400 outline-none"
        ref={ref}
        {...rest}
      />
    </div>
  ),
);

Input.displayName = 'Input';
