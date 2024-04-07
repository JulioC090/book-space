'use client';

import NavBar from '@/components/organism/Navbar';

export interface SideMenuLayoutProps {
  children: React.ReactNode;
}

export default function SideMenuLayout({ children }: SideMenuLayoutProps) {
  return (
    <div className="flex flex-col-reverse h-screen sm:h-fit sm:flex-row w-full">
      <NavBar />
      <main className="flex-grow sm:min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
