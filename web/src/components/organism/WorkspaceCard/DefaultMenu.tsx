import { FloatingMenu } from '@/components/molecules/FloatingMenu';
import { WorkspaceContext } from '@/contexts/WorkspacesContext';
import { Workspace } from '@/models/Workspace';
import {
  BookmarkSimple,
  LinkSimple,
  SignOut,
} from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';

interface DefaultMenuProps {
  workspace: Workspace;
}

export default function DefaultMenu({ workspace }: DefaultMenuProps) {
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
