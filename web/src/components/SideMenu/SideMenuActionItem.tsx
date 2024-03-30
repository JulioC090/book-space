import SideMenuIconItem from '@/components/SideMenu/SideMenuIconItem';
import SideMenuItem from '@/components/SideMenu/SideMenuItem';
import { ButtonHTMLAttributes } from 'react';

export interface SideMenuActionItemProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string;
}

export default function SideMenuActionItem({
  label,
  icon,
  ...rest
}: SideMenuActionItemProps) {
  return (
    <SideMenuItem>
      <button {...rest}>
        <SideMenuIconItem>{icon}</SideMenuIconItem>
        <span className="hidden lg:block">{label}</span>
      </button>
    </SideMenuItem>
  );
}
