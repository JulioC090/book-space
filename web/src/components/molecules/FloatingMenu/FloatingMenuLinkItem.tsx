import LinkButton from '@/components/atoms/LinkButton';
import { FloatingMenuItem } from '@/components/molecules/FloatingMenu/FloatingMenuItem';
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import { useRef } from 'react';

export interface FloatingMenuLinkItemProps extends DropdownMenuItemProps {
  label: string;
  icon?: React.ReactNode;
  href: string;
}

export default function FloatingMenuLinkItem({
  label,
  icon,
  href,
  ...rest
}: FloatingMenuLinkItemProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  return (
    <FloatingMenuItem {...rest} onSelect={() => linkRef.current?.click()}>
      <LinkButton ref={linkRef} href={href} icon={icon} variant="unstyled">
        {label}
      </LinkButton>
    </FloatingMenuItem>
  );
}
