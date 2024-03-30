'use client';

import { SideMenu } from '@/components/SideMenu';
import SideMenuActionItem from '@/components/SideMenu/SideMenuActionItem';
import { AuthContext } from '@/contexts/AuthContext';
import { BookOpen, HouseSimple, SignOut } from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';

export interface SideMenuLayoutProps {
  children: React.ReactNode;
}

export default function SideMenuLayout({ children }: SideMenuLayoutProps) {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex flex-col-reverse h-screen sm:h-fit sm:flex-row w-screen">
      <SideMenu.Root>
        <SideMenu.Header
          user={{ name: 'Teste da silva', email: 'teste32@email.com' }}
        />
        <SideMenu.List>
          <SideMenu.LinkItem
            icon={<HouseSimple />}
            link="/"
            label="Workspaces"
          />
          <SideMenu.LinkItem
            icon={<BookOpen />}
            link="/book"
            label="Agendar espaço"
          />
        </SideMenu.List>
        <SideMenu.Footer>
          <SideMenuActionItem
            onClick={logout}
            icon={<SignOut />}
            label="Sair"
          />
        </SideMenu.Footer>
      </SideMenu.Root>
      <main className="flex-grow sm:min-h-screen">{children}</main>
    </div>
  );
}
