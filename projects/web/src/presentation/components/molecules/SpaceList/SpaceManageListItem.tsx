import Space from '@/models/Space';
import Card from '@/presentation/components/atoms/Card';
import { IconButton } from '@/presentation/components/atoms/IconButton';
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
              resources: workspaceResources.resources.filter((resource) =>
                spaceField.resources?.includes(resource.id),
              ),
            })
          }
        />
      </Modal>
    </Card>
  );
}
