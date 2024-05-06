import { Availability } from '@/models/Availability';
import { SpaceAvailability } from '@/models/SpaceAvailability';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const weekDay = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

const TimeInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ ...rest }, ref) => {
  return (
    <input
      className="grow bg-zinc-900 border-2 px-3 rounded border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 focus:border-zinc-400 focus:bg-zinc-800 outline-none"
      type="time"
      ref={ref}
      {...rest}
    />
  );
});

TimeInput.displayName = 'TimeInput';

export interface AvailabilityInputProps {
  children: React.ReactNode;
  defaultValue?: Availability;
  toggle?: boolean;
  onToggle?(): void;
  onChange?(value: Availability): void;
}

function AvailabilityInput({
  children,
  defaultValue,
  toggle = false,
  onToggle,
  onChange,
}: AvailabilityInputProps) {
  const [isToggle, setIsToggle] = useState<boolean>(toggle);
  const startTimeInput = useRef<HTMLInputElement>(null);
  const endTimeInput = useRef<HTMLInputElement>(null);

  const handleToggle = () => {
    setIsToggle((prev) => !prev);
    onToggle && onToggle();
  };

  const handleOnChange = () => {
    const startTime = startTimeInput.current?.value;
    const endTime = endTimeInput.current?.value;

    onChange &&
      onChange({
        startTime,
        endTime,
      });
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <button
        type="button"
        className={twMerge(
          clsx(
            'flex items-center justify-center p-2 bg-zinc-900 border-2 border-zinc-800 size-8 rounded hover:border-zinc-700 outline-none focus:ring-2 ring-green-haze-500 ring-offset-2 ring-offset-zinc-950',
            {
              'border-green-haze-600 hover:border-green-haze-500': isToggle,
            },
          ),
        )}
        onClick={handleToggle}
      >
        {children}
      </button>
      {isToggle && (
        <>
          <TimeInput
            ref={startTimeInput}
            onChange={handleOnChange}
            required
            defaultValue={defaultValue?.startTime}
          />
          <ArrowRight size={16} />
          <TimeInput
            ref={endTimeInput}
            onChange={handleOnChange}
            required
            defaultValue={defaultValue?.endTime}
          />
        </>
      )}
    </div>
  );
}

interface AvailabilityWeekInputProps {
  defaultValue?: Array<SpaceAvailability>;
  onChange?: (value: Array<SpaceAvailability>) => void;
}

export default function AvailabilityWeekInput({
  defaultValue,
  onChange,
}: AvailabilityWeekInputProps) {
  const [availabilityRanges, setAvailabilityRanges] = useState<
    Array<SpaceAvailability>
  >(
    defaultValue?.map((value) => ({
      ...value,
      startTime: value.startTime,
      endTime: value.endTime,
    })) || [],
  );

  const handleToggleAvailability = (weekday: number) => {
    const weekDayIndex = availabilityRanges.findIndex(
      (value) => weekday === value.weekday,
    );

    if (weekDayIndex === -1) {
      setAvailabilityRanges((prevAvailability) => [
        ...prevAvailability,
        { weekday, startTime: '', endTime: '' },
      ]);
      onChange &&
        onChange([
          ...availabilityRanges,
          { weekday, startTime: '', endTime: '' },
        ]);
    } else {
      availabilityRanges.splice(weekDayIndex, 1);
      setAvailabilityRanges((prevAvailability) => [...prevAvailability]);
      onChange && onChange([...availabilityRanges]);
    }
  };

  const handleOnChange = (weekday: number, availability: Availability) => {
    const updatedRanges = [...availabilityRanges];
    const weekDayIndex = updatedRanges.findIndex(
      (value) => weekday === value.weekday,
    );
    updatedRanges[weekDayIndex] = {
      ...updatedRanges[weekDayIndex],
      ...availability,
    };

    setAvailabilityRanges(updatedRanges);
    onChange && onChange(updatedRanges);
  };

  return (
    <div
      className={clsx('flex flex-row gap-2', {
        'flex-col': availabilityRanges.length > 0,
      })}
    >
      {weekDay.map((day, index) => {
        const defaultInputValue = defaultValue?.find(
          (availability) => availability.weekday === index,
        );

        return (
          <AvailabilityInput
            key={`${day}-${index}`}
            defaultValue={defaultInputValue}
            toggle={!!defaultInputValue}
            onToggle={() => handleToggleAvailability(index)}
            onChange={(value) => handleOnChange(index, value)}
          >
            {day}
          </AvailabilityInput>
        );
      })}
    </div>
  );
}
