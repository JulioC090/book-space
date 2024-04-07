import { ResponsiveResumer } from '@/components/atoms/ResponsiveResumer';
import { User } from '@/models/User';
import getInitials from '@/utils/getInitials';

export interface SideMenuHeaderProps {
  user: Omit<User, 'id' | 'password'>;
}

export default function SideMenuHeader({ user }: SideMenuHeaderProps) {
  return (
    <ResponsiveResumer.Root sizeTrigger="lg" asChild>
      <header className="hidden sm:flex gap-4 justify-center">
        <ResponsiveResumer.Show className="flex justify-center items-center rounded-full p-3 size-9 bg-zinc-500 lg:p-4 lg:size-12">
          {getInitials(user.name, 1)}
        </ResponsiveResumer.Show>
        <ResponsiveResumer.Hidden className="flex-grow">
          <p className="font-semibold">{user.name}</p>
          <span className="text-xs text-zinc-400">{user.email}</span>
        </ResponsiveResumer.Hidden>
      </header>
    </ResponsiveResumer.Root>
  );
}
