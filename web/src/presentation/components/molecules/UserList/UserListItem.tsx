'use client';

import { workspaceRolesList } from '@/consts/workspaceRolesList';
import { User } from '@/models/User';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import { IconButton } from '@/presentation/components/atoms/IconButton';
import { SelectionField } from '@/presentation/components/atoms/SelectionField';
import { AuthContext } from '@/presentation/contexts/AuthContext';
import { WorkspaceDetailsContext } from '@/presentation/contexts/WorkspaceDetailsContext';
import getInitials from '@/presentation/utils/getInitials';
import getRolesWithLowerLevel from '@/presentation/utils/getRolesWithLowerLevel';
import { isRoleAboveOrSame } from '@/presentation/utils/isRoleAbove';
import { TrashSimple } from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';

interface UserListItemProps {
  user: Omit<User, 'password'> & { role: WorkspaceRoles };
}

interface RoleFieldProps {
  user: Omit<User, 'password'> & { role: WorkspaceRoles };
}

function RoleField({ user }: RoleFieldProps) {
  const { userInfo } = useContext(AuthContext);
  const { workspace, updateUserRole } = useContext(WorkspaceDetailsContext);

  if (
    userInfo?.email === user.email ||
    isRoleAboveOrSame(workspace!.role, user.role)
  )
    return (
      <SelectionField
        className="w-fit min-w-32"
        defaultValue={user.role}
        options={[
          {
            ...workspaceRolesList.find(
              (roleItem) => roleItem.value === user.role,
            )!,
          },
        ]}
        disabled
      />
    );

  return (
    <SelectionField
      className="w-fit min-w-32"
      defaultValue={user.role}
      onChange={(value) => updateUserRole(user.email, value)}
      options={getRolesWithLowerLevel(workspace!.role)}
    />
  );
}

export default function UserListItem({ user }: UserListItemProps) {
  const { deleteUser } = useContext(WorkspaceDetailsContext);

  return (
    <div className="flex justify-between items-center w-full p-4 [&:not(:last-child)]:border-b border-b-zinc-900">
      <div className="flex gap-4 items-center ">
        <div className="flex justify-center items-center rounded-full p-3 size-9 bg-zinc-500 lg:p-4 lg:size-12">
          {getInitials(user.name, 1)}
        </div>
        <div>
          <p className="font-semibold">{user.name}</p>
          <span className="text-xs text-zinc-400">{user.email}</span>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <RoleField user={user} />

        <IconButton onClick={() => deleteUser(user.email)}>
          <TrashSimple />
        </IconButton>
      </div>
    </div>
  );
}
