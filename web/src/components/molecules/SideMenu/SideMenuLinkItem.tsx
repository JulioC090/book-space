import LinkButton from '@/components/atoms/LinkButton';
import SideMenuItem from '@/components/molecules/SideMenu/SideMenuItem';

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
      <LinkButton href={link} icon={icon} variant="unstyled">
        <span className="hidden lg:block">{label}</span>
      </LinkButton>
    </SideMenuItem>
  );
}
