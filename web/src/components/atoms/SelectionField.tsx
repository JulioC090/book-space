import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { forwardRef, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

interface SelectItemProps extends Select.SelectItemProps {
  value: string;
  children: React.ReactNode;
}

const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ value, children, ...rest }, ref) => (
    <Select.Item
      value={value}
      ref={ref}
      {...rest}
      className="py-3 px-3 [&:not(:last-child)]:border-b border-b-zinc-800 data-[highlighted]:bg-zinc-800 outline-none text-sm"
    >
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  ),
);

SelectItem.displayName = 'SelectItem';

interface SelectionFieldProps extends Partial<ControllerRenderProps> {
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

export const SelectionField = forwardRef<
  HTMLButtonElement,
  SelectionFieldProps
>(
  (
    { className, defaultValue, placeholder, options, onChange, ...rest },
    ref,
  ) => {
    const [value, setValue] = useState(defaultValue);

    return (
      <Select.Root
        defaultValue={defaultValue}
        onValueChange={(value) => {
          setValue(value);
          onChange && onChange(value);
        }}
        {...rest}
      >
        <Select.Trigger
          className={clsx(
            'flex items-center justify-between gap-3 h-12 py-4 px-3 rounded border-zinc-800 border-2 bg-zinc-900 w-full data-[disabled=false]:hover:bg-zinc-800 data-[disabled=false]:hover:border-zinc-700 focus-within:!border-zinc-400 focus-within:bg-zinc-800 outline-none text-sm data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed',
            className,
          )}
          ref={ref}
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon>
            <CaretDown />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content
            className="overflow-hidden z-50 bg-zinc-900 border-zinc-800 border-2 w-radix-trigger-width rounded"
            position="popper"
            sideOffset={8}
          >
            <Select.Viewport>
              {options
                .sort((a, b) => {
                  if (a.value === value) return -1;
                  if (b.value === value) return 1;
                  return 0;
                })
                .map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    );
  },
);

SelectionField.displayName = 'SelectionField';
