'use client';

import Button from '@/components/atoms/Button';
import Card from '@/components/atoms/Card';
import Container from '@/components/atoms/Container';
import GridList from '@/components/atoms/GridList';
import { IconButton } from '@/components/atoms/IconButton';
import WorkspaceAddUserForm from '@/components/organism/Forms/WorkspaceAddUserForm';
import WorkspaceForm from '@/components/organism/Forms/WorkspaceForm';
import Modal from '@/components/organism/Modal';
import { WorkspaceDetailsContext } from '@/contexts/WorkspaceDetailsContext';
import getInitials from '@/utils/getInitials';
import { TrashSimple } from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';

export default function WorkspaceManager() {
  const { workspace, updateWorkspace, addUser, deleteUser } = useContext(
    WorkspaceDetailsContext,
  );
  if (!workspace) return;
  return (
    <Container>
      <div className="flex justify-between pt-8">
        <h1 className="text-2xl font-bold">
          {workspace.name}
          <span className="text-zinc-500 font-normal ml-2">
            @{workspace.tag}
          </span>
        </h1>
        <Modal
          title="Editar Workspace"
          trigger={<Button>Editar Workspace</Button>}
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
        <div className="mt-2 w-full max-h-128 border-2 border-zinc-900 rounded overflow-y-auto">
          {workspace.users.length === 0 && (
            <div className="flex flex-col justify-center text-center text-zinc-500 w-full p-4 ">
              <p>Nenhum usuário encontrado.</p>
              <p>Adicione um novo usuário usando o botão acima.</p>
            </div>
          )}
          {workspace.users.map((user) => (
            <div
              key={user.id}
              className="flex justify-between items-center w-full p-4 [&:not(:last-child)]:border-b border-b-zinc-900"
            >
              <div className="flex gap-4 items-center ">
                <div className="flex justify-center items-center rounded-full p-3 size-9 bg-zinc-500 lg:p-4 lg:size-12">
                  {getInitials(user.name, 1)}
                </div>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <span className="text-xs text-zinc-400">{user.email}</span>
                </div>
              </div>
              <IconButton onClick={() => deleteUser(user.email)}>
                <TrashSimple />
              </IconButton>
            </div>
          ))}
        </div>
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
