import Space from '@/models/Space';
import Badge from '@/presentation/components/atoms/Badge';
import Card from '@/presentation/components/atoms/Card';
import LinkButton from '@/presentation/components/atoms/LinkButton';
import BadgeList from '@/presentation/components/molecules/BadgeList';
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
        <LinkButton
          href={`/book/${space.id}`}
          variant="unstyled"
          className="bg-green-haze-600 text-zinc-200 px-4 py-2 rounded min-w-fit hover:bg-green-haze-500 default-focus focus:bg-green-haze-500"
        >
          Agendar
        </LinkButton>
      </Card>
    </li>
  );
}
