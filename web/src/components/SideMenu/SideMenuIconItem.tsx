import { Slot } from '@radix-ui/react-slot';

export interface SideMenuIconItemProps {
  children: React.ReactNode;
}

export default function SideMenuIconItem({ children }: SideMenuIconItemProps) {
  return <Slot className="size-5 lg:size-4 text-zinc-100">{children}</Slot>;
}
