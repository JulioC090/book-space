'use client';

import { FloatingMenu } from '@/components/molecules/FloatingMenu';
import WorkspaceAddUserForm from '@/components/organism/Forms/WorkspaceAddUserForm';
import WorkspaceForm from '@/components/organism/Forms/WorkspaceForm';
import Modal from '@/components/organism/Modal';
import { WorkspaceContext } from '@/contexts/WorkspacesContext';
import { Workspace } from '@/models/Workspace';
import {
  BookmarkSimple,
  Cards,
  HouseSimple,
  LinkSimple,
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
          handleAddUser={(userEmail: string) =>
            addUser(workspace.id, userEmail)
          }
        />
      </Modal>

      <FloatingMenu.Item icon={<HouseSimple />}>
        Adicionar Espaço
      </FloatingMenu.Item>

      <FloatingMenu.Separator />

      <FloatingMenu.Item icon={<LinkSimple />}>Obter Link</FloatingMenu.Item>
      <FloatingMenu.Item icon={<BookmarkSimple />}>
        Adicionar Anotação
      </FloatingMenu.Item>

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
