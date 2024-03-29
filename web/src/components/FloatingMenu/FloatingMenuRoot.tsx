import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';

export interface FloatingMenuRootProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export default function FloatingMenuRoot({
  trigger,
  children,
}: FloatingMenuRootProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent className="bg-zinc-800 border-zinc-700 border-2 rounded shadow-sm p-2 z-10 text-sm">
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
