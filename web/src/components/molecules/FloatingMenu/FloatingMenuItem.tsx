import {
  DropdownMenuItem,
  DropdownMenuItemProps,
} from '@radix-ui/react-dropdown-menu';
import { Slot } from '@radix-ui/react-slot';
import clsx from 'clsx';
import { forwardRef } from 'react';

export interface FloatingMenuItemProps extends DropdownMenuItemProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  hasModal?: boolean;
}

export const FloatingMenuItem = forwardRef<
  HTMLDivElement,
  FloatingMenuItemProps
>(({ icon, children, hasModal, ...rest }, ref) => (
  <DropdownMenuItem
    ref={ref}
    className={clsx('rounded data-[highlighted]:bg-zinc-700 outline-none', {
      'flex flex-row items-center gap-2 p-2': icon,
    })}
    {...(hasModal && { onSelect: (event) => event.preventDefault() })}
    {...rest}
  >
    <>
      <Slot className="h-4 w-4">{icon}</Slot> {children}
    </>
  </DropdownMenuItem>
));

FloatingMenuItem.displayName = 'FloatingMenu.Item';
