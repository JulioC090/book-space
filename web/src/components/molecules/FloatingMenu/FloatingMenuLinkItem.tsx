import { FloatingMenuItem } from '@/components/molecules/FloatingMenu/FloatingMenuItem';
import { DropdownMenuItemProps } from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';

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
  return (
    <Link href={href}>
      <FloatingMenuItem icon={icon} label={label} {...rest} />
    </Link>
  );
}
