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
      <FloatingMenu.Item icon={<LinkSimple />} label="Obter Link" />
      <FloatingMenu.Item icon={<BookmarkSimple />} label="Adicionar Anotação" />

      <FloatingMenu.Separator />

      <FloatingMenu.Item
        icon={<SignOut />}
        label="Sair da Workspace"
        onSelect={() => leaveWorkspace(workspace.id)}
      />
    </>
  );
}
