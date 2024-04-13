'use client';

import Container from '@/presentation/components/atoms/Container';
import WorkspaceList from '@/presentation/components/molecules/WorkspaceList';
import WorkspaceForm from '@/presentation/components/organism/Forms/WorkspaceForm';
import ActionListTemplate from '@/presentation/components/templates/ActionListTemplate';
import { WorkspaceContext } from '@/presentation/contexts/WorkspacesContext';
import { useContext } from 'react';

export default function Home() {
  const { workspaces, addWorkspace } = useContext(WorkspaceContext);

  return (
    <Container>
      <ActionListTemplate
        title={<h1 className="text-2xl font-bold">Workspaces</h1>}
        action={{
          name: 'Adicionar Workspace',
          form: <WorkspaceForm onWorkspaceSubmit={addWorkspace} />,
        }}
        list={<WorkspaceList data={workspaces} />}
      />
    </Container>
  );
}
