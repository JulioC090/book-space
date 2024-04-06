import { WorkspaceDetailProvider } from '@/contexts/WorkspaceDetailsContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <WorkspaceDetailProvider>{children}</WorkspaceDetailProvider>;
}
