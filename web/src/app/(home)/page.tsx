'use client';

import Container from '@/components/atoms/Container';
import WorkspaceList from '@/components/molecules/WorkspaceList';
import WorkspaceForm from '@/components/organism/Forms/WorkspaceForm';
import ActionListTemplate from '@/components/templates/ActionListTemplate';
import { WorkspaceContext } from '@/contexts/WorkspacesContext';
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
