import { Workspace } from '@/models/Workspace';
import { FloatingMenu } from '@/presentation/components/molecules/FloatingMenu';
import { WorkspaceContext } from '@/presentation/contexts/WorkspacesContext';
import {
  BookmarkSimple,
  LinkSimple,
  SignOut,
} from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';

interface WorkspaceListItemDefaultMenuProps {
  workspace: Workspace;
}

export default function WorkspaceListItemDefaultMenu({
  workspace,
}: WorkspaceListItemDefaultMenuProps) {
  const { leaveWorkspace } = useContext(WorkspaceContext);

  return (
    <>
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
