'use client';

import { Workspace } from '@/models/Workspace';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import { FloatingMenu } from '@/presentation/components/molecules/FloatingMenu';
import SpaceForm from '@/presentation/components/organism/Forms/SpaceForm';
import WorkspaceAddUserForm from '@/presentation/components/organism/Forms/WorkspaceAddUserForm';
import WorkspaceForm from '@/presentation/components/organism/Forms/WorkspaceForm';
import Modal from '@/presentation/components/organism/Modal';
import { WorkspaceContext } from '@/presentation/contexts/WorkspacesContext';
import useSpaces from '@/presentation/hooks/useSpaces';
import {
  Cards,
  HouseSimple,
  Notebook,
  TrashSimple,
  User,
} from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';

interface WorkspaceListItemOwnerMenuProps {
  workspace: Workspace;
}

export default function WorkspaceListItemOwnerMenu({
  workspace,
}: WorkspaceListItemOwnerMenuProps) {
  const { updateWorkspace, deleteWorkspace, addUser } =
    useContext(WorkspaceContext);
  const { addSpace } = useSpaces();

  return (
    <>
      <FloatingMenu.LinkItem
        href={`/workspace/${workspace.id}/manage`}
        icon={<Cards />}
        label="Gerenciar workspace"
      />

      <FloatingMenu.Separator />
      <Modal
        title="Editar Workspace"
        hasForm
        trigger={
          <FloatingMenu.Item icon={<Notebook />} hasModal>
            Editar Workspace
          </FloatingMenu.Item>
        }
      >
        <WorkspaceForm
          onWorkspaceSubmit={({ id, ...rest }) => updateWorkspace(id!, rest)}
          workspace={workspace}
        />
      </Modal>
      <Modal
        title="Adicionar usuário"
        hasForm
        trigger={
          <FloatingMenu.Item icon={<User />} hasModal>
            Adicionar Membro
          </FloatingMenu.Item>
        }
      >
        <WorkspaceAddUserForm
          handleAddUser={(userEmail: string, role: WorkspaceRoles) =>
            addUser(workspace.id, userEmail, role)
          }
          role={workspace.role}
        />
      </Modal>
      <Modal
        title="Adicionar Espaço"
        hasForm
        trigger={
          <FloatingMenu.Item icon={<HouseSimple />} hasModal>
            Adicionar Espaço
          </FloatingMenu.Item>
        }
      >
        <SpaceForm
          onSpaceSubmit={(space) =>
            addSpace(
              workspace.id,
              {
                name: space.name,
                description: space.description,
                maxAmountOfPeople: space.maxAmountOfPeople,
                availabilityRange: space.availability,
              },
              space.resources,
            )
          }
        />
      </Modal>

      <FloatingMenu.Separator />

      <FloatingMenu.Item
        onSelect={() => deleteWorkspace(workspace.id)}
        icon={<TrashSimple />}
      >
        Excluir Workspace
      </FloatingMenu.Item>
    </>
  );
}
