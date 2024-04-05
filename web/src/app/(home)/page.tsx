'use client';

import Button from '@/components/Button';
import Container from '@/components/Container';
import WorkspaceForm from '@/components/Forms/WorkspaceForm';
import Modal from '@/components/Modal';
import WorkspaceCard from '@/components/WorkspaceCard/WorkspaceCard';
import { WorkspaceContext } from '@/contexts/WorkspacesContext';
import { useContext } from 'react';

export default function Home() {
  const { workspaces } = useContext(WorkspaceContext);

  return (
    <Container>
      <div className="flex justify-between pt-8">
        <h1 className="text-2xl font-bold">Workspaces</h1>
        <Modal
          title="Adicionar Workspace"
          trigger={<Button>Adicionar Workspace</Button>}
          hasForm
        >
          <WorkspaceForm />
        </Modal>
      </div>
      {workspaces.length === 0 ? (
        <div className="text-center text-zinc-500 flex-grow flex flex-col justify-center">
          <p>Nenhum workspace encontrado.</p>
          <p>Adicione um novo workspace usando o botão acima.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-8">
          {workspaces.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} />
          ))}
        </div>
      )}
    </Container>
  );
}
