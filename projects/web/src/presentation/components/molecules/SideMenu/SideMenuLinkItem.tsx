import LinkButton from '@/presentation/components/atoms/LinkButton';
import { ResponsiveResumer } from '@/presentation/components/atoms/ResponsiveResumer';
import SideMenuItem from '@/presentation/components/molecules/SideMenu/SideMenuItem';

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
      <ResponsiveResumer.Root sizeTrigger="lg" asChild>
        <LinkButton href={link} variant="unstyled">
          <ResponsiveResumer.Show>{icon}</ResponsiveResumer.Show>
          <ResponsiveResumer.Hidden asChild>
            <span>{label}</span>
          </ResponsiveResumer.Hidden>
        </LinkButton>
      </ResponsiveResumer.Root>
    </SideMenuItem>
  );
}
