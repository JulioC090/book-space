'use client';

import Badge from '@/presentation/components/atoms/Badge';
import { IconButton } from '@/presentation/components/atoms/IconButton';
import BadgeList from '@/presentation/components/molecules/BadgeList';
import useMergeRefs from '@/presentation/hooks/useMergeRefs';
import {
  Combobox,
  ComboboxDisclosure,
  ComboboxItem,
  ComboboxItemCheck,
  ComboboxItemProps,
  ComboboxPopover,
  ComboboxProvider,
} from '@ariakit/react';
import { X } from '@phosphor-icons/react/dist/ssr';
import { Slot } from '@radix-ui/react-slot';
import { matchSorter } from 'match-sorter';
import {
  InputHTMLAttributes,
  forwardRef,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';

interface MultiSelectionFieldItemProps extends ComboboxItemProps {
  value: string;
  children: React.ReactNode;
}

const MultiSelectionFieldItem = forwardRef<
  HTMLDivElement,
  MultiSelectionFieldItemProps
>(({ value, children, ...rest }, ref) => (
  <ComboboxItem
    value={value}
    focusOnHover
    className="py-3 px-3 [&:not(:last-child)]:border-b border-b-zinc-800 data-[active-item]:bg-zinc-800 outline-none text-sm flex flex-row"
    ref={ref}
    {...rest}
  >
    <ComboboxItemCheck className="hidden" />
    {children}
  </ComboboxItem>
));

MultiSelectionFieldItem.displayName = 'MultiSelectionFieldItem';

type ListData = { label: string; value: string };

interface MultiSelectionFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'defaultValue'
  > {
  icon?: React.ReactNode;
  data: Array<ListData>;
  setValues?(values: Array<ListData>): void;
  createItem?(value: string): Promise<ListData | null>;
  onChange?(value: Array<string>): void;
  defaultValue?: Array<ListData>;
}

export const MultiSelectionField = forwardRef<
  HTMLInputElement,
  MultiSelectionFieldProps
>(({ icon, data, createItem, onChange, defaultValue, ...rest }, ref) => {
  const [isPending, startTransition] = useTransition();
  const [searchValue, setSearchValue] = useState('');
  const [selectedValues, setSelectedValues] = useState<Array<ListData>>(
    defaultValue || [],
  );
  const comboboxRef = useRef<HTMLInputElement>(null);

  const mergedRefs = useMergeRefs(comboboxRef, ref);

  const matches = useMemo(
    () =>
      matchSorter(
        data.filter(
          (value) => !selectedValues.find((v) => v.label === value.label),
        ),
        searchValue,
        { keys: ['label'] },
      ),
    [data, searchValue, selectedValues],
  );

  const changeSelectedValues = (value: Array<ListData>) => {
    onChange && onChange(value.map((v) => v.value));
    setSelectedValues(value);
  };

  const canCreateItem = (): boolean => {
    return (
      !data.find((dataValue) => dataValue.label === searchValue) &&
      searchValue.length > 2 &&
      !!createItem
    );
  };

  const addItem = async (values: string[]) => {
    let item;

    const value = values[values.length - 1];

    item = data.find((v) => v.value === value);

    if (!item) {
      if (!canCreateItem) return;
      item = await createItem!(searchValue);
      if (!item) return;
    }

    changeSelectedValues([...selectedValues, item]);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && searchValue.length === 0) {
      selectedValues.pop();
      changeSelectedValues([...selectedValues]);
      return;
    }

    if (e.key === 'Enter') {
      if (comboboxRef.current?.dataset.activeItem && searchValue.length === 0) {
        return;
      }
      if (comboboxRef.current?.dataset.activeItem && canCreateItem()) {
        e.preventDefault();
        await addItem([...selectedValues.map((v) => v.value), searchValue]);
        setSearchValue('');
        return;
      }
    }
  };

  return (
    <ComboboxProvider
      selectedValue={selectedValues.map((v) => v.value)}
      setSelectedValue={addItem}
      setValue={(value) => {
        startTransition(() => {
          setSearchValue(value);
        });
      }}
    >
      <div
        className="flex items-center gap-3 min-h-12 py-4 px-3 rounded border-zinc-800 border-2 bg-zinc-900 w-full hover:bg-zinc-800 hover:border-zinc-700 focus-within:!border-zinc-400 focus-within:bg-zinc-800 cursor-text"
        onClick={() => {
          comboboxRef.current?.focus();
        }}
      >
        {icon && <Slot className="w-6 h-6 text-zinc-400">{icon}</Slot>}
        <div className="flex items-center gap-3 flex-wrap w-full">
          {selectedValues.length > 0 && (
            <BadgeList>
              {selectedValues.map((value) => (
                <Badge key={value.value + 'badge'}>
                  {value.label}
                  <IconButton
                    className="hover:bg-green-haze-600 focus:bg-green-haze-600 -mr-1"
                    type="button"
                    onClick={() => {
                      changeSelectedValues(
                        selectedValues.filter(
                          (selectedValue) => value !== selectedValue,
                        ),
                      );
                    }}
                  >
                    <X className="!size-3 !p-0" />
                  </IconButton>
                </Badge>
              ))}
            </BadgeList>
          )}
          <Combobox
            ref={mergedRefs}
            className="bg-transparent flex-1 text-zinc-100 text-sm placeholder:text-zinc-400 outline-none min-w-32 w-full h-4"
            value={searchValue}
            onKeyDown={handleKeyDown}
            {...rest}
          />
        </div>
        <ComboboxDisclosure />
      </div>
      <ComboboxPopover
        gutter={32}
        className="border-zinc-800 border-2 bg-zinc-900 rounded max-h-72 overflow-y-auto min-w-32"
        aria-busy={isPending}
      >
        {matches.map((value) => (
          <MultiSelectionFieldItem key={value.value} value={value.value}>
            {value.label}
          </MultiSelectionFieldItem>
        ))}
        {matches.length < 5 && canCreateItem() && (
          <MultiSelectionFieldItem value={searchValue.trim()}>
            <span className="mr-1">Criar</span>
            <Badge>{searchValue.trim()}</Badge>
          </MultiSelectionFieldItem>
        )}
      </ComboboxPopover>
    </ComboboxProvider>
  );
});

MultiSelectionField.displayName = 'MultiSelectionField';
