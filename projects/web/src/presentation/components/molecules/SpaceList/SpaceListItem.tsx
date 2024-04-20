import Space from '@/models/Space';
import Card from '@/presentation/components/atoms/Card';

interface SpaceListItemProps {
  space: Space;
}

export default function SpaceListItem({ space }: SpaceListItemProps) {
  return (
    <Card>
      <p className="text-lg font-bold">{space.name}</p>
      <p className="text-sm text-zinc-400">{space.description}</p>
      {space.maxAmountOfPeople && (
        <p className="text-sm text-zinc-400 mt-4">
          Máximo de pessoas: {space.maxAmountOfPeople}
        </p>
      )}
    </Card>
  );
}
