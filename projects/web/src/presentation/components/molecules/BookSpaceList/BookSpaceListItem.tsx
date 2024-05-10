import Space from '@/models/Space';
import Badge from '@/presentation/components/atoms/Badge';
import Button from '@/presentation/components/atoms/Button';
import Card from '@/presentation/components/atoms/Card';
import BadgeList from '@/presentation/components/molecules/BadgeList';
import BookForm from '@/presentation/components/organism/Forms/BookForm';
import Modal from '@/presentation/components/organism/Modal';
import { Users } from '@phosphor-icons/react/dist/ssr';

interface BookSpaceListItemProps {
  space: Required<Space>;
}

export default function BookSpaceListItem({ space }: BookSpaceListItemProps) {
  return (
    <li>
      <Card className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-8 items-center">
            <span className="text-md">
              {space.workspace.tag}/{space.name}
            </span>
            {space.maxAmountOfPeople && (
              <span className="flex flex-row gap-2 justify-center items-center text-sm text-zinc-300">
                {space.maxAmountOfPeople}
                <Users className="size-4" />
              </span>
            )}
          </div>
          <p className="text-sm text-zinc-200">{space.description}</p>
          <BadgeList>
            {space.resources?.map((resource) => (
              <Badge key={resource.id}>{resource.name}</Badge>
            ))}
          </BadgeList>
        </div>
        <Modal
          trigger={<Button>Agendar</Button>}
          hasForm
          title={`Agendar ${space.name}`}
        >
          <BookForm spaceId={space.id} availability={space.availabilityRange} />
        </Modal>
      </Card>
    </li>
  );
}
