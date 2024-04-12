import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import * as Select from '@radix-ui/react-select';
import clsx from 'clsx';
import { forwardRef } from 'react';
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
  ) => (
    <Select.Root defaultValue={defaultValue} onValueChange={onChange} {...rest}>
      <Select.Trigger
        className={clsx(
          'flex items-center justify-between gap-3 h-12 py-4 px-3 rounded border-zinc-800 border-2 bg-zinc-900 w-full hover:bg-zinc-800 hover:border-zinc-700 focus-within:!border-zinc-400 focus-within:bg-zinc-800 outline-none text-sm',
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
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  ),
);

SelectionField.displayName = 'SelectionField';
