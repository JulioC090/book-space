import SideMenuIconItem from '@/components/SideMenu/SideMenuIconItem';
import SideMenuItem from '@/components/SideMenu/SideMenuItem';
import Link from 'next/link';

export interface SideMenuLinkItemProps {
  link: string;
  label: string;
  icon: React.ReactNode;
}

export default function SideMenuLinkItem({
  label,
  link,
  icon,
}: SideMenuLinkItemProps) {
  return (
    <SideMenuItem>
      <Link href={link}>
        <SideMenuIconItem>{icon}</SideMenuIconItem>
        <span className="hidden lg:block">{label}</span>
      </Link>
    </SideMenuItem>
  );
}
