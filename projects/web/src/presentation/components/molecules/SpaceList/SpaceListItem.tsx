import Space from '@/models/Space';
import Badge from '@/presentation/components/atoms/Badge';
import Card from '@/presentation/components/atoms/Card';
import BadgeList from '@/presentation/components/molecules/BadgeList';

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
      <div className="flex flex-col gap-1">
        {space.maxAmountOfPeople && (
          <p className="text-sm text-zinc-400">
            Máximo de pessoas: {space.maxAmountOfPeople}
          </p>
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
