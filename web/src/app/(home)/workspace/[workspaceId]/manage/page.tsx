'use client';

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Container from '@/components/atoms/Container';
import GridList from '@/components/atoms/GridList';
import { IconButton } from '@/components/atoms/IconButton';
import UserList from '@/components/molecules/UserList';
import WorkspaceAddUserForm from '@/components/organism/Forms/WorkspaceAddUserForm';
import WorkspaceForm from '@/components/organism/Forms/WorkspaceForm';
import Modal from '@/components/organism/Modal';
import { WorkspaceDetailsContext } from '@/contexts/WorkspaceDetailsContext';
import { NotePencil } from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';

export default function WorkspaceManager() {
  const { workspace, updateWorkspace, addUser } = useContext(
    WorkspaceDetailsContext,
  );
  if (!workspace) return;
  return (
    <Container>
      <div className="flex gap-2 pt-8">
        <h1 className="text-2xl font-bold">
          {workspace.name}
          <span className="text-zinc-500 font-normal ml-2">
            @{workspace.tag}
          </span>
        </h1>
        <Modal
          title="Editar Workspace"
          trigger={
            <IconButton>
              <NotePencil />
            </IconButton>
          }
          hasForm
        >
          <WorkspaceForm
            onWorkspaceSubmit={({ id, ...rest }) => updateWorkspace(id!, rest)}
            workspace={workspace}
          />
        </Modal>
      </div>
      <p className="text-zinc-500">Atualize as informações da sua Workspace</p>
      <div className="mt-16">
        <div className="flex justify-between pt-8">
          <h2 className="text-xl font-bold mb-2">Membros</h2>
          <Modal
            title="Adicionar usuário"
            trigger={<Button>Adicionar usuário</Button>}
            hasForm
          >
            <WorkspaceAddUserForm handleAddUser={addUser} />
          </Modal>
        </div>
        <UserList data={workspace.users} />
      </div>
      <div className="mt-16 mb-16">
        <div className="flex justify-between pt-8">
          <h2 className="text-xl font-bold mb-2">Espaços</h2>
          <Modal
            title="Adicionar Espaço"
            trigger={<Button>Adicionar espaço</Button>}
          >
            Em desenvolvimento
          </Modal>
        </div>
        <GridList className="w-full max-h-128">
          <Card className="min-h-64 flex justify-center items-center">
            Em desenvolvimento
          </Card>
          <Card className="min-h-64 flex justify-center items-center">
            Em desenvolvimento
          </Card>
          <Card className="min-h-64 flex justify-center items-center">
            Em desenvolvimento
          </Card>
        </GridList>
      </div>
    </Container>
  );
}
