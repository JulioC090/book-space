import {
  DropdownMenuItem,
  DropdownMenuItemProps,
} from '@radix-ui/react-dropdown-menu';
import { Slot } from '@radix-ui/react-slot';
import { forwardRef } from 'react';

export interface FloatingMenuItemProps extends DropdownMenuItemProps {
  label: string;
  icon?: React.ReactNode;
  hasModal?: boolean;
}

export const FloatingMenuItem = forwardRef<
  HTMLDivElement,
  FloatingMenuItemProps
>(({ icon, label, hasModal, ...rest }, ref) => (
  <DropdownMenuItem
    ref={ref}
    className="flex flex-row items-center gap-2 p-2 rounded data-[highlighted]:bg-zinc-700 outline-none"
    {...(hasModal && { onSelect: (event) => event.preventDefault() })}
    {...rest}
  >
    <Slot className="h-4 w-4">{icon}</Slot> {label}
  </DropdownMenuItem>
));

FloatingMenuItem.displayName = 'FloatingMenu.Item';
