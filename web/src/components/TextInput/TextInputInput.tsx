import { InputHTMLAttributes, forwardRef } from 'react';

export interface TextInputInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInputInput = forwardRef<HTMLInputElement, TextInputInputProps>(
  ({ ...rest }, ref) => (
    <input
      className="bg-transparent flex-1 text-zinc-100 text-sm placeholder:text-zinc-400 outline-none"
      ref={ref}
      {...rest}
    />
  ),
);

TextInputInput.displayName = 'TextInputInput';
