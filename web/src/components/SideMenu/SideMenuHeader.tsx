import { User } from '@/models/User';
import getInitials from '@/utils/getInitials';

export interface SideMenuHeaderProps {
  user: Omit<User, 'id' | 'password'>;
}

export default function SideMenuHeader({ user }: SideMenuHeaderProps) {
  return (
    <header className="sm:flex gap-4 items-center justify-center hidden">
      <div className="flex justify-center items-center rounded-full p-3 size-9 bg-zinc-500 lg:p-4 lg:size-12">
        {getInitials(user.name, 1)}
      </div>
      <div className="hidden lg:block">
        <p className="font-semibold">{user.name}</p>
        <span className="text-xs text-zinc-400">{user.email}</span>
      </div>
    </header>
  );
}
