'use client';

import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import Container from '@/presentation/components/atoms/Container';
import { IconButton } from '@/presentation/components/atoms/IconButton';
import SpaceList from '@/presentation/components/molecules/SpaceList/SpaceList';
import UserList from '@/presentation/components/molecules/UserList';
import SpaceForm from '@/presentation/components/organism/Forms/SpaceForm';
import WorkspaceAddUserForm from '@/presentation/components/organism/Forms/WorkspaceAddUserForm';
import WorkspaceForm from '@/presentation/components/organism/Forms/WorkspaceForm';
import Modal from '@/presentation/components/organism/Modal';
import ActionListTemplate from '@/presentation/components/templates/ActionListTemplate';
import { WorkspaceDetailsContext } from '@/presentation/contexts/WorkspaceDetailsContext';
import useSpaces from '@/presentation/hooks/useSpaces';
import useWorkspaceResource from '@/presentation/hooks/useWorkspaceResource';
import { NotePencil } from '@phosphor-icons/react/dist/ssr';
import { useContext, useEffect } from 'react';

export default function WorkspaceManager() {
  const { workspace, updateWorkspace, addUser } = useContext(
    WorkspaceDetailsContext,
  );
  const { spaces, loadSpaces, addSpace } = useSpaces();
  const { loadResources } = useWorkspaceResource();

  useEffect(() => {
    if (!workspace) return;
    loadSpaces(workspace.spaces);
    loadResources({
      workspaceId: workspace.id,
      resources: workspace.resources,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspace]);

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
            form: (
              <SpaceForm
                onSpaceSubmit={(space) =>
                  addSpace(
                    workspace.id,
                    {
                      name: space.name,
                      description: space.description,
                      maxAmountOfPeople: space.maxAmountOfPeople,
                      availabilityRange: space.availability,
                    },
                    space.resources,
                  )
                }
              />
            ),
          }}
          list={<SpaceList data={spaces} workspaceId={workspace.id} manage />}
        />
      </div>
    </Container>
  );
}
