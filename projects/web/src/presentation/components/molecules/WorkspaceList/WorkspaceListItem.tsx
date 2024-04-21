'use client';

import { Workspace } from '@/models/Workspace';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import Card from '@/presentation/components/atoms/Card';
import { IconButton } from '@/presentation/components/atoms/IconButton';
import { FloatingMenu } from '@/presentation/components/molecules/FloatingMenu';
import { WorkspaceListItemMenu } from '@/presentation/components/molecules/WorkspaceList/WorkspaceListItemMenu';
import getInitials from '@/presentation/utils/getInitials';
import { getRole } from '@/presentation/utils/getRole';
import { DotsThree } from '@phosphor-icons/react/dist/ssr';
import Link from 'next/link';

export interface WorkspaceListItemProps {
  workspace: Workspace;
}

export default function WorkspaceListItem({
  workspace,
}: WorkspaceListItemProps) {
  const roleMenuMap: { [key in WorkspaceRoles]: React.ReactNode } = {
    OWNER: <WorkspaceListItemMenu.Owner workspace={workspace} />,
    MANAGER: <WorkspaceListItemMenu.Manager workspace={workspace} />,
    DEFAULT: <WorkspaceListItemMenu.Default workspace={workspace} />,
  };

  const menuComponent = roleMenuMap[workspace.role] || roleMenuMap.DEFAULT;

  return (
    <Link href={`/workspace/${workspace.id}`}>
      <Card className="flex flex-col justify-between items-center gap-8">
        {workspace.role !== WorkspaceRoles.DEFAULT && (
          <div className="absolute top-2 left-4 text-zinc-500 text-sm">
            {getRole(workspace.role)?.label}
          </div>
        )}

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
    </Link>
  );
}
