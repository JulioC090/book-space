import Space from '@/models/Space';
import Card from '@/presentation/components/atoms/Card';
import { IconButton } from '@/presentation/components/atoms/IconButton';
import { TrashSimple } from '@phosphor-icons/react/dist/ssr';

interface SpaceListItemProps {
  space: Space;
  onDelete(spaceId: string): Promise<boolean>;
}

export default function SpaceListItem({ space, onDelete }: SpaceListItemProps) {
  return (
    <Card>
      <p className="text-lg font-bold">{space.name}</p>
      <p className="text-sm text-zinc-400">{space.description}</p>
      {space.maxAmountOfPeople && (
        <p className="text-sm text-zinc-400 mt-4">
          Máximo de pessoas: {space.maxAmountOfPeople}
        </p>
      )}
      <IconButton onClick={() => onDelete(space.id)}>
        <TrashSimple />
      </IconButton>
    </Card>
  );
}
