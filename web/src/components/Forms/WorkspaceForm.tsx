import Button from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { Workspace } from '@/models/Workspace';
import { BookmarkSimple, Notebook } from '@phosphor-icons/react/dist/ssr';

export interface WorkspaceFormProps {
  workspace?: Workspace;
}

export default function WorkspaceForm({ workspace }: WorkspaceFormProps) {
  return (
    <form className="flex flex-col items-center max-w-md w-full gap-3 p-4">
      <TextInput.Root>
        <TextInput.Wrapper>
          <TextInput.Icon>
            <Notebook />
          </TextInput.Icon>
          <TextInput.Input
            defaultValue={workspace?.name}
            placeholder="Digite o nome da Workspace"
          />
        </TextInput.Wrapper>
      </TextInput.Root>

      <TextInput.Root>
        <TextInput.Wrapper>
          <TextInput.Icon>
            <BookmarkSimple />
          </TextInput.Icon>
          <TextInput.Input
            defaultValue={workspace?.tag}
            placeholder="Digite uma tag para a Workspace"
          />
        </TextInput.Wrapper>
      </TextInput.Root>

      <Button className="mt-8 w-full">
        {!workspace ? 'Adicionar Workspace' : 'Editar Workspace'}
      </Button>
    </form>
  );
}
