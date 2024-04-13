'use client';

import NavBar from '@/presentation/components/organism/Navbar';
import { WorkspacesProvider } from '@/presentation/contexts/WorkspacesContext';

export interface SideMenuLayoutProps {
  children: React.ReactNode;
}

export default function SideMenuLayout({ children }: SideMenuLayoutProps) {
  return (
    <WorkspacesProvider>
      <div className="flex flex-col-reverse h-screen sm:h-fit sm:flex-row w-full">
        <NavBar />
        <main className="flex-grow sm:min-h-screen overflow-y-auto">
          {children}
        </main>
      </div>
    </WorkspacesProvider>
  );
}
