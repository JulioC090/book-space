import Space from '@/models/Space';
import Badge from '@/presentation/components/atoms/Badge';
import { IconButton } from '@/presentation/components/atoms/IconButton';
import ActionCard from '@/presentation/components/molecules/ActionCard';
import BadgeList from '@/presentation/components/molecules/BadgeList';
import SpaceEditForm from '@/presentation/components/organism/Forms/SpaceEditForm';
import Modal from '@/presentation/components/organism/Modal';
import useWorkspaceResource from '@/presentation/hooks/useWorkspaceResource';
import { NotePencil, TrashSimple } from '@phosphor-icons/react/dist/ssr';

interface SpaceManageListItemProps {
  space: Space;
  onUpdate(partialSpace: Omit<Space, 'id'>): Promise<boolean>;
  onDelete(spaceId: string): Promise<boolean>;
}

export default function SpaceManageListItem({
  space,
  onUpdate,
  onDelete,
}: SpaceManageListItemProps) {
  const { workspaceResources } = useWorkspaceResource();

  return (
    <ActionCard
      actionBar={
        <>
          <Modal
            title="Editar espaço"
            hasForm
            trigger={
              <IconButton>
                <NotePencil />
              </IconButton>
            }
          >
            <SpaceEditForm
              space={space}
              onSpaceSubmit={(spaceField) =>
                onUpdate({
                  name: spaceField.name,
                  description: spaceField.description,
                  maxAmountOfPeople: spaceField.maxAmountOfPeople,
                  availabilityRange: spaceField.availability,
                  resources: workspaceResources.resources.filter((resource) =>
                    spaceField.resources?.includes(resource.id),
                  ),
                })
              }
            />
          </Modal>
          <IconButton onClick={() => onDelete(space.id)}>
            <TrashSimple />
          </IconButton>
        </>
      }
    >
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
    </ActionCard>
  );
}
