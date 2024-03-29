'use client';

import Button from '@/components/Button';
import Container from '@/components/Container';
import WorkspaceForm from '@/components/Forms/WorkspaceForm';
import Modal from '@/components/Modal';
import WorkspaceCard from '@/components/WorkspaceCard';

export default function Home() {
  const workspaces = [
    { id: '1', name: 'Workspace 1', tag: 'tag 1', acronym: 'W1' },
    { id: '2', name: 'Workspace de Teste', tag: 'tag 2', acronym: 'W2' },
    { id: '3', name: 'Workspace', tag: 'tag 3', acronym: 'W3' },
    { id: '4', name: 'Workspace 4', tag: 'tag 4', acronym: 'W4' },
    { id: '5', name: 'Workspace 5', tag: 'tag 5', acronym: 'W5' },
  ];

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8 gap-8">
        {workspaces.map((workspace) => (
          <WorkspaceCard key={workspace.id} workspace={workspace} />
        ))}
      </div>
    </Container>
  );
}
