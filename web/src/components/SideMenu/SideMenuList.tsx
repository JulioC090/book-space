export interface SideMenuListProps {
  children: React.ReactNode;
}

export default function SideMenuList({ children }: SideMenuListProps) {
  return (
    <ul className="sm:flex-grow flex flex-row sm:flex-col gap-8 sm:gap-4 lg:gap-2">
      {children}
    </ul>
  );
}
