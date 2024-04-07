'use client';

import Card from '@/components/atoms/Card';
import { IconButton } from '@/components/atoms/IconButton';
import { FloatingMenu } from '@/components/molecules/FloatingMenu';
import { WorkspaceListItemMenu } from '@/components/molecules/WorkspaceList/WorkspaceListItemMenu';
import { Workspace } from '@/models/Workspace';
import getInitials from '@/utils/getInitials';
import { DotsThree } from '@phosphor-icons/react/dist/ssr';

export interface WorkspaceListItemProps {
  workspace: Workspace;
}

export default function WorkspaceListItem({
  workspace,
}: WorkspaceListItemProps) {
  const roleMenuMap: { [key: string]: React.ReactNode } = {
    OWNER: <WorkspaceListItemMenu.Owner workspace={workspace} />,
  };

  const menuComponent = roleMenuMap[workspace.role] || (
    <WorkspaceListItemMenu.Default workspace={workspace} />
  );

  return (
    <Card className="flex flex-col justify-between items-center gap-8">
      <div className="bg-green-haze-500 size-24 p-8 rounded font-bold text-xl flex justify-center items-center">
        {getInitials(workspace.name)}
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-lg font-semibold">{workspace.name}</h2>
        <span className="text-zinc-500 text-sm">{workspace.tag}</span>
      </div>

      <FloatingMenu.Root
        trigger={
          <IconButton className="absolute top-2 right-2 ">
            <DotsThree />
          </IconButton>
        }
      >
        {menuComponent}
      </FloatingMenu.Root>
    </Card>
  );
}
