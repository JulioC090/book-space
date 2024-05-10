import { SpaceAvailability } from '@/models/SpaceAvailability';
import Button from '@/presentation/components/atoms/Button';
import FormError from '@/presentation/components/atoms/FormError';
import { Input } from '@/presentation/components/atoms/Input';
import { weekDayList } from '@/presentation/constants/weekDayList';
import useSpaces from '@/presentation/hooks/useSpaces';
import toTime from '@/presentation/utils/toTime';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IBookFields {
  day: string;
  startTime: string;
  endTime: string;
}

interface BookFormProps {
  spaceId: string;
  availability: Array<SpaceAvailability>;
  onSubmit?(): void;
}

export default function BookForm({
  spaceId,
  availability,
  onSubmit,
}: BookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IBookFields>();
  const [availabilityValue, setAvailabilityValue] =
    useState<SpaceAvailability>();
  const { bookSpace } = useSpaces();

  const handleBookSubmit: SubmitHandler<IBookFields> = async (data) => {
    const day = new Date(data.day);
    day.setHours(24);
    let isValidDay = true;
    let isAvailable = true;

    if (availability.length > 0) {
      const weekDayAvailability = availability.find(
        (avail) => avail.weekday === day.getDay(),
      );

      if (!weekDayAvailability) {
        isValidDay = false;
      }

      if (
        weekDayAvailability &&
        (toTime(weekDayAvailability!.startTime!) > data.startTime ||
          toTime(weekDayAvailability!.endTime!) < data.endTime)
      ) {
        isAvailable = false;
        setAvailabilityValue({
          ...weekDayAvailability!,
          startTime: toTime(weekDayAvailability!.startTime!),
          endTime: toTime(weekDayAvailability!.endTime!),
        });
      }
    }

    if (!isValidDay) {
      const formError = { type: 'invalid_day' };
      setError('day', formError);
      return;
    }

    if (!isAvailable) {
      const formError = { type: 'invalid_range_availability' };
      setError('startTime', formError);
      setError('endTime', formError);
      return;
    }

    if (data.startTime > data.endTime) {
      const formError = { type: 'invalid_range' };
      setError('startTime', formError);
      setError('endTime', formError);
      return;
    }

    if (!(await bookSpace(spaceId, data))) {
      const formError = { type: 'invalid_book' };
      setError('startTime', formError);
      setError('endTime', formError);
      return;
    }

    onSubmit && onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit(handleBookSubmit)}
      className="flex flex-col max-w-md w-full gap-3 p-4"
    >
      <Input
        type="date"
        {...register('day', { required: true })}
        error={!!errors.day}
      />
      <div className="flex flex-row items-center gap-2">
        <Input
          type="time"
          {...register('startTime', { required: true })}
          error={!!errors.startTime}
        />
        <ArrowRight className="shrink-0" size={20} />
        <Input
          type="time"
          {...register('endTime', { required: true })}
          error={!!errors.endTime}
        />
      </div>

      <FormError
        error={errors.day?.type}
        messages={{
          invalid_day: `Selecione um dos seguintes dias ${availability.map((a) => weekDayList[a.weekday as keyof typeof weekDayList])}`,
        }}
      />

      <FormError
        error={errors.startTime?.type}
        messages={{
          invalid_range:
            'A hora de início do agendamento precisa ser menor que a hora final do agendamento',
          invalid_range_availability: `A hora de início e a hora final precisa estar entre: ${availabilityValue?.startTime} e ${availabilityValue?.endTime}`,
          invalid_book: 'O espaço não está disponível nesse horário',
        }}
      />

      <Button type="submit">Agendar</Button>
    </form>
  );
}
