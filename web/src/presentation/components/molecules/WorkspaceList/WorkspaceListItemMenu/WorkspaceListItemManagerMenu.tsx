'use client';

import { Workspace } from '@/models/Workspace';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import { FloatingMenu } from '@/presentation/components/molecules/FloatingMenu';
import WorkspaceAddUserForm from '@/presentation/components/organism/Forms/WorkspaceAddUserForm';
import Modal from '@/presentation/components/organism/Modal';
import { WorkspaceContext } from '@/presentation/contexts/WorkspacesContext';
import {
  BookmarkSimple,
  Cards,
  HouseSimple,
  LinkSimple,
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
        icon={<SignOut />}
        onSelect={() => leaveWorkspace(workspace.id)}
      >
        Sair da Workspace
      </FloatingMenu.Item>
    </>
  );
}
