'use client';

import { SideMenu } from '@/components/molecules/SideMenu';
import SideMenuActionItem from '@/components/molecules/SideMenu/SideMenuActionItem';
import { AuthContext } from '@/contexts/AuthContext';
import { BookOpen, HouseSimple, SignOut } from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';

export interface SideMenuLayoutProps {
  children: React.ReactNode;
}

export default function SideMenuLayout({ children }: SideMenuLayoutProps) {
  const { userInfo, logout } = useContext(AuthContext);

  if (!userInfo) return;

  return (
    <div className="flex flex-col-reverse h-screen sm:h-fit sm:flex-row w-full">
      <SideMenu.Root>
        <SideMenu.Header user={userInfo!} />
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
      <main className="flex-grow sm:min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
