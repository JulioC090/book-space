'use client';

import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import Card from '@/presentation/components/atoms/Card';
import Container from '@/presentation/components/atoms/Container';
import GridList from '@/presentation/components/atoms/GridList';
import { IconButton } from '@/presentation/components/atoms/IconButton';
import UserList from '@/presentation/components/molecules/UserList';
import WorkspaceAddUserForm from '@/presentation/components/organism/Forms/WorkspaceAddUserForm';
import WorkspaceForm from '@/presentation/components/organism/Forms/WorkspaceForm';
import Modal from '@/presentation/components/organism/Modal';
import ActionListTemplate from '@/presentation/components/templates/ActionListTemplate';
import { WorkspaceDetailsContext } from '@/presentation/contexts/WorkspaceDetailsContext';
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
        {workspace.role === WorkspaceRoles.OWNER && (
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
              onWorkspaceSubmit={({ id, ...rest }) =>
                updateWorkspace(id!, rest)
              }
              workspace={workspace}
            />
          </Modal>
        )}
      </div>
      <p className="text-zinc-500">Atualize as informações da sua Workspace</p>
      <div className="mt-16">
        <ActionListTemplate
          title={<h2 className="text-xl font-bold mb-2">Membros</h2>}
          action={{
            name: 'Adicionar usuário',
            form: (
              <WorkspaceAddUserForm
                handleAddUser={addUser}
                role={workspace.role}
              />
            ),
          }}
          list={<UserList data={workspace.users} />}
        />
      </div>
      <div className="mt-16 mb-16">
        <ActionListTemplate
          title={<h2 className="text-xl font-bold mb-2">Espaços</h2>}
          action={{
            name: 'Adicionar Espaço',
            form: 'Em desenvolvimento',
          }}
          list={
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
          }
        />
      </div>
    </Container>
  );
}
