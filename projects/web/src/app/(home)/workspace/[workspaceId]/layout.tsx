import { WorkspaceDetailProvider } from '@/presentation/contexts/WorkspaceDetailsContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <WorkspaceDetailProvider>{children}</WorkspaceDetailProvider>;
}
