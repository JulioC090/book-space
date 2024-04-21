'use client';

import Container from '@/presentation/components/atoms/Container';
import SpaceList from '@/presentation/components/molecules/SpaceList/SpaceList';
import ListTemplate from '@/presentation/components/templates/ListTemplate';
import { WorkspaceDetailsContext } from '@/presentation/contexts/WorkspaceDetailsContext';
import useSpaces from '@/presentation/hooks/useSpaces';
import { useContext, useEffect } from 'react';

export default function WorkspaceDetails() {
  const { workspace } = useContext(WorkspaceDetailsContext);
  const { spaces, loadSpaces } = useSpaces();

  useEffect(() => {
    if (!workspace) return;
    loadSpaces(workspace.spaces);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace]);

  if (!workspace) return;

  return (
    <Container>
      <h1 className="text-2xl font-bold pt-8">
        {workspace.name}
        <span className="text-zinc-500 font-normal ml-2">@{workspace.tag}</span>
      </h1>
      <div className="mt-16 mb-16">
        <ListTemplate
          title={<h2 className="text-xl font-bold mb-2">Espaços</h2>}
          list={<SpaceList data={spaces} workspaceId={workspace.id} />}
        />
      </div>
    </Container>
  );
}
