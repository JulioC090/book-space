'use client';

import Button from '@/components/atoms/Button';
import Container from '@/components/atoms/Container';
import WorkspaceList from '@/components/molecules/WorkspaceList';
import WorkspaceForm from '@/components/organism/Forms/WorkspaceForm';
import Modal from '@/components/organism/Modal';
import { WorkspaceContext } from '@/contexts/WorkspacesContext';
import { useContext } from 'react';

export default function Home() {
  const { workspaces, addWorkspace } = useContext(WorkspaceContext);

  return (
    <Container>
      <div className="flex justify-between pt-8">
        <h1 className="text-2xl font-bold">Workspaces</h1>
        <Modal
          title="Adicionar Workspace"
          trigger={<Button>Adicionar Workspace</Button>}
          hasForm
        >
          <WorkspaceForm onWorkspaceSubmit={addWorkspace} />
        </Modal>
      </div>
      <WorkspaceList data={workspaces} />
    </Container>
  );
}
