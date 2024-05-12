import { SideMenu } from '@/presentation/components/molecules/SideMenu';
import SideMenuActionItem from '@/presentation/components/molecules/SideMenu/SideMenuActionItem';
import { AuthContext } from '@/presentation/contexts/AuthContext';
import {
  BookOpen,
  HouseSimple,
  Notebook,
  SignOut,
} from '@phosphor-icons/react/dist/ssr';
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
        <SideMenu.LinkItem
          icon={<Notebook />}
          link="/bookings"
          label="Agendamentos"
        />
      </SideMenu.List>
      <SideMenu.Footer>
        <SideMenuActionItem onClick={logout} icon={<SignOut />} label="Sair" />
      </SideMenu.Footer>
    </SideMenu.Root>
  );
}
