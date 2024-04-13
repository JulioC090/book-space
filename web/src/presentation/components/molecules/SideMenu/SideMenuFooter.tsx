import SideMenuList from '@/presentation/components/molecules/SideMenu/SideMenuList';

export interface SideMenuFooterProps {
  children: React.ReactNode;
}

export default function SideMenuFooter({ children }: SideMenuFooterProps) {
  return (
    <footer>
      <SideMenuList>{children}</SideMenuList>
    </footer>
  );
}
