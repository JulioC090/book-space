'use client';

import { WorkspaceDetailsContext } from '@/presentation/contexts/WorkspaceDetailsContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect } from 'react';

type RestrictAreaProps = {
  children: React.ReactNode;
};

export default function RestrictArea({ children }: RestrictAreaProps) {
  const { workspace } = useContext(WorkspaceDetailsContext);
  const router = useRouter();

  useEffect(() => {
    if (workspace?.role === 'DEFAULT') {
      router.push(`/workspace/${workspace.id}`);
    }
  }, [workspace, router]);

  if (!workspace) {
    return null;
  }

  if (workspace.role === 'DEFAULT') {
    return null;
  }

  return children;
}
