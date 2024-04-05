'use client';

import { FloatingMenu } from '@/components/FloatingMenu';
import WorkspaceForm from '@/components/Forms/WorkspaceForm';
import Modal from '@/components/Modal';
import { WorkspaceContext } from '@/contexts/WorkspacesContext';
import { Workspace } from '@/models/Workspace';
import {
  BookmarkSimple,
  Buildings,
  HouseSimple,
  LinkSimple,
  Notebook,
  TrashSimple,
  User,
  Users,
} from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';

interface OwnerMenuProps {
  workspace: Workspace;
}

export default function OwnerMenu({ workspace }: OwnerMenuProps) {
  const { deleteWorkspace } = useContext(WorkspaceContext);

  return (
    <>
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

      <FloatingMenu.Separator />

      <FloatingMenu.Item icon={<Users />} label="Gerenciar Equipe" />
      <FloatingMenu.Item icon={<User />} label="Adicionar Membro" />

      <FloatingMenu.Separator />

      <FloatingMenu.Item icon={<Buildings />} label="Gerenciar Espaços" />
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
