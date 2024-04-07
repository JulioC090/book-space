export interface SideMenuRootProps {
  children: React.ReactNode;
}

export default function SideMenuRoot({ children }: SideMenuRootProps) {
  return (
    <nav className="flex flex-row justify-center sm:flex-col gap-8 h-screen max-h-screen sticky top-0 bg-zinc-900 p-2 sm:px-4 sm:py-8 lg:p-8 lg:min-w-64">
      {children}
    </nav>
  );
}
