import Space from '@/models/Space';
import Badge from '@/presentation/components/atoms/Badge';
import Card from '@/presentation/components/atoms/Card';
import BadgeList from '@/presentation/components/molecules/BadgeList';
import { weekDayList } from '@/presentation/constants/weekDayList';
import toTime from '@/presentation/utils/toTime';

interface SpaceListItemProps {
  space: Space;
}

export default function SpaceListItem({ space }: SpaceListItemProps) {
  return (
    <Card>
      <div className="mb-4">
        <p className="text-lg font-bold">{space.name}</p>
        <p className="text-sm text-zinc-400">{space.description}</p>
      </div>
      <div className="flex flex-col gap-2">
        {space.maxAmountOfPeople && (
          <p className="text-sm text-zinc-400">
            <span className="font-semibold text-zinc-50">
              Máximo de pessoas:{' '}
            </span>
            {space.maxAmountOfPeople}
          </p>
        )}
        {space.availabilityRange!.length > 0 && (
          <div className="flex flex-col gap-1">
            <p className="text-sm font-semibold">Disponibilidade:</p>
            <ul className="list-disc ml-4">
              {space.availabilityRange &&
                [...space.availabilityRange]
                  .sort((a, b) => a.weekday - b.weekday)
                  .map(({ weekday, startTime, endTime }) => (
                    <li key={weekday} className="text-sm text-zinc-400">
                      {weekDayList[weekday as keyof typeof weekDayList]}, das{' '}
                      {toTime(startTime!)} às {toTime(endTime!)}
                    </li>
                  ))}
            </ul>
          </div>
        )}

        <BadgeList>
          {space.resources?.map((resource) => (
            <Badge key={resource.id}>{resource.name}</Badge>
          ))}
        </BadgeList>
      </div>
    </Card>
  );
}
