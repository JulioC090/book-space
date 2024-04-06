'use client';

import { FloatingMenu } from '@/components/FloatingMenu';
import WorkspaceAddUserForm from '@/components/Forms/WorkspaceAddUserForm';
import WorkspaceForm from '@/components/Forms/WorkspaceForm';
import Modal from '@/components/Modal';
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

interface OwnerMenuProps {
  workspace: Workspace;
}

export default function OwnerMenu({ workspace }: OwnerMenuProps) {
  const { deleteWorkspace, addUser } = useContext(WorkspaceContext);

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
          <FloatingMenu.Item
            icon={<Notebook />}
            label="Editar Workspace"
            hasModal
          />
        }
      >
        <WorkspaceForm workspace={workspace} />
      </Modal>
      <Modal
        title="Adicionar usuário"
        hasForm
        trigger={
          <FloatingMenu.Item
            icon={<User />}
            label="Adicionar Membro"
            hasModal
          />
        }
      >
        <WorkspaceAddUserForm
          handleAddUser={(userEmail: string) =>
            addUser(workspace.id, userEmail)
          }
        />
      </Modal>

      <FloatingMenu.Item icon={<HouseSimple />} label="Adicionar Espaço" />

      <FloatingMenu.Separator />

      <FloatingMenu.Item icon={<LinkSimple />} label="Obter Link" />
      <FloatingMenu.Item icon={<BookmarkSimple />} label="Adicionar Anotação" />

      <FloatingMenu.Separator />

      <FloatingMenu.Item
        onSelect={() => deleteWorkspace(workspace.id)}
        icon={<TrashSimple />}
        label="Excluir Workspace"
      />
    </>
  );
}
