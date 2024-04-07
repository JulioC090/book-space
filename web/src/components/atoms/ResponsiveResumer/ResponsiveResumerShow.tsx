import { Slot } from '@radix-ui/react-slot';

interface ResponsiveResumerShowProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export default function ResponsiveResumerShow({
  children,
  asChild,
  className,
}: ResponsiveResumerShowProps) {
  const Comp = asChild ? Slot : 'div';

  return <Comp className={className}>{children}</Comp>;
}
