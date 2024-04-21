import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

export interface FloatingMenuRootProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
}

export default function FloatingMenuRoot({
  trigger,
  children,
}: FloatingMenuRootProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-zinc-800 border-zinc-700 border-2 rounded shadow-sm p-2 z-10 text-sm"
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
