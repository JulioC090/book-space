import { Slot } from '@radix-ui/react-slot';

export interface SideMenuItemProps {
  children: React.ReactNode;
}

export default function SideMenuItem({ children }: SideMenuItemProps) {
  return (
    <li>
      <Slot className="flex flex-row items-center gap-4 rounded w-full p-4 lg:px-4 lg:py-2 text-zinc-100 hover:bg-zinc-800 focus:ring-2 ring-zinc-800 ring-offset-2 ring-offset-zinc-900 outline-none">
        {children}
      </Slot>
    </li>
  );
}
