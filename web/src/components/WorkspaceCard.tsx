import { FloatingMenu } from '@/components/FloatingMenu';
import WorkspaceForm from '@/components/Forms/WorkspaceForm';
import { IconButton } from '@/components/IconButton';
import Modal from '@/components/Modal';
import { Workspace } from '@/models/Workspace';
import getInitials from '@/utils/getInitials';
import {
  BookmarkSimple,
  Buildings,
  DotsThree,
  HouseSimple,
  LinkSimple,
  Notebook,
  TrashSimple,
  User,
  Users,
} from '@phosphor-icons/react/dist/ssr';

export interface WorkspaceCardProps {
  workspace: Workspace;
}

export default function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  return (
    <div className="flex flex-col justify-between items-center gap-8 bg-zinc-900 border-zinc-800 border-2 shadow-sm p-4 pt-8 rounded relative">
      <div className="bg-green-haze-500 p-8 w-fit rounded font-bold text-xl">
        {getInitials(workspace.name)}
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-lg font-semibold">{workspace.name}</h2>
        <span className="text-gray-500 text-sm">{workspace.tag}</span>
      </div>

      <FloatingMenu.Root
        trigger={
          <IconButton className="absolute top-2 right-2 ">
            <DotsThree />
          </IconButton>
        }
      >
        <Modal
          title="Editar Workspace"
          trigger={
            <FloatingMenu.Item
              icon={<Notebook />}
              label="Editar Workspace"
              hasModal
            />
          }
        >
          <WorkspaceForm workspace={workspace} />
        </Modal>

        <FloatingMenu.Separator />

        <FloatingMenu.Item icon={<Users />} label="Gerenciar Equipe" />
        <FloatingMenu.Item icon={<User />} label="Adicionar Membro" />

        <FloatingMenu.Separator />

        <FloatingMenu.Item icon={<Buildings />} label="Gerenciar Espaços" />
        <FloatingMenu.Item icon={<HouseSimple />} label="Adicionar Espaço" />

        <FloatingMenu.Separator />

        <FloatingMenu.Item icon={<LinkSimple />} label="Obter Link" />
        <FloatingMenu.Item
          icon={<BookmarkSimple />}
          label="Adicionar Anotação"
        />

        <FloatingMenu.Separator />

        <FloatingMenu.Item icon={<TrashSimple />} label="Excluir Workspace" />
      </FloatingMenu.Root>
    </div>
  );
}
