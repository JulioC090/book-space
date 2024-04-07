import { SideMenu } from '@/components/molecules/SideMenu';
import SideMenuActionItem from '@/components/molecules/SideMenu/SideMenuActionItem';
import { AuthContext } from '@/contexts/AuthContext';
import { BookOpen, HouseSimple, SignOut } from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';

export default function NavBar() {
  const { userInfo, logout } = useContext(AuthContext);
  if (!userInfo) return;

  return (
    <SideMenu.Root>
      <SideMenu.Header user={userInfo!} />
      <SideMenu.List>
        <SideMenu.LinkItem icon={<HouseSimple />} link="/" label="Workspaces" />
        <SideMenu.LinkItem
          icon={<BookOpen />}
          link="/book"
          label="Agendar espaço"
        />
      </SideMenu.List>
      <SideMenu.Footer>
        <SideMenuActionItem onClick={logout} icon={<SignOut />} label="Sair" />
      </SideMenu.Footer>
    </SideMenu.Root>
  );
}
