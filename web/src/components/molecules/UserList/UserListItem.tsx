'use client';

import { IconButton } from '@/components/atoms/IconButton';
import { WorkspaceDetailsContext } from '@/contexts/WorkspaceDetailsContext';
import { User } from '@/models/User';
import getInitials from '@/utils/getInitials';
import { TrashSimple } from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';

interface UserListItemProps {
  user: Omit<User, 'password'>;
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
      <IconButton onClick={() => deleteUser(user.email)}>
        <TrashSimple />
      </IconButton>
    </div>
  );
}
