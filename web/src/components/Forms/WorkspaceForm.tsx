import Button from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { Workspace } from '@/models/Workspace';
import { BookmarkSimple, Notebook } from '@phosphor-icons/react/dist/ssr';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface WorkspaceFormProps {
  workspace?: Workspace;
}

interface IWorkspaceFields {
  name: string;
  tag: string;
}

export default function WorkspaceForm({ workspace }: WorkspaceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IWorkspaceFields>();

  const handleWorkspaceSubmit: SubmitHandler<IWorkspaceFields> = async (
    data,
  ) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleWorkspaceSubmit)}
      className="flex flex-col items-center max-w-md w-full gap-3 p-4"
    >
      <TextInput.Root>
        <TextInput.Wrapper error={!!errors.name}>
          <TextInput.Icon>
            <Notebook />
          </TextInput.Icon>
          <TextInput.Input
            {...register('name', { required: true, minLength: 2 })}
            defaultValue={workspace?.name}
            placeholder="Digite o nome da Workspace"
          />
        </TextInput.Wrapper>
        <TextInput.Error>
          {errors.name?.type === 'required' && 'O nome é obrigatório'}
          {errors.name?.type === 'minLength' &&
            'O nome precisa ter pelo menos dois caracteres'}
        </TextInput.Error>
      </TextInput.Root>

      <TextInput.Root>
        <TextInput.Wrapper error={!!errors.tag}>
          <TextInput.Icon>
            <BookmarkSimple />
          </TextInput.Icon>
          <TextInput.Input
            {...register('tag', { required: true, minLength: 2 })}
            defaultValue={workspace?.tag}
            placeholder="Digite uma tag para a Workspace"
          />
        </TextInput.Wrapper>
        <TextInput.Error>
          {errors.tag?.type === 'required' && 'A tag é obrigatória'}
          {errors.tag?.type === 'minLength' &&
            'A tag precisa ter pelo menos dois caracteres'}
        </TextInput.Error>
      </TextInput.Root>

      <Button className="mt-8 w-full">
        {!workspace ? 'Adicionar Workspace' : 'Editar Workspace'}
      </Button>
    </form>
  );
}
