import RestrictArea from '@/presentation/components/organism/RestrictArea';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <RestrictArea>{children}</RestrictArea>;
}
