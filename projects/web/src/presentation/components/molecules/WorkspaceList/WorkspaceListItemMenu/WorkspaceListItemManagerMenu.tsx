'use client';

import { Workspace } from '@/models/Workspace';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import { FloatingMenu } from '@/presentation/components/molecules/FloatingMenu';
import SpaceForm from '@/presentation/components/organism/Forms/SpaceForm';
import WorkspaceAddUserForm from '@/presentation/components/organism/Forms/WorkspaceAddUserForm';
import Modal from '@/presentation/components/organism/Modal';
import { WorkspaceContext } from '@/presentation/contexts/WorkspacesContext';
import useSpaces from '@/presentation/hooks/useSpaces';
import {
  Cards,
  HouseSimple,
  SignOut,
  User,
} from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';

interface WorkspaceListItemManagerMenuProps {
  workspace: Workspace;
}

export default function WorkspaceListItemManagerMenu({
  workspace,
}: WorkspaceListItemManagerMenuProps) {
  const { addUser, leaveWorkspace } = useContext(WorkspaceContext);
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
        icon={<SignOut />}
        onSelect={() => leaveWorkspace(workspace.id)}
      >
        Sair da Workspace
      </FloatingMenu.Item>
    </>
  );
}
