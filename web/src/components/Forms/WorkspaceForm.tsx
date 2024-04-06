import Button from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { WorkspaceContext } from '@/contexts/WorkspacesContext';
import { Workspace } from '@/models/Workspace';
import { BookmarkSimple, Notebook } from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export interface WorkspaceFormProps {
  workspace?: Omit<Workspace, 'role'>;
  onSubmit?(): void;
}

interface IWorkspaceFields {
  name: string;
  tag: string;
}

export default function WorkspaceForm({
  workspace,
  onSubmit,
}: WorkspaceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IWorkspaceFields>();
  const { addWorkspace, updateWorkspace } = useContext(WorkspaceContext);

  const handleWorkspaceSubmit: SubmitHandler<IWorkspaceFields> = async (
    data,
  ) => {
    let response: boolean = false;
    if (!workspace) {
      response = await addWorkspace(data);
    } else {
      response = await updateWorkspace(workspace.id, data);
    }

    if (!response) {
      const formError = { type: 'server' };
      setError('name', formError);
      setError('tag', formError);
      return;
    }

    onSubmit && onSubmit();
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

      {errors.name?.type === 'server' && (
        <div className="bg-red-300 py-3 px-4 w-full text-sm text-red-700 border-red-400 border-2 font-bold rounded">
          Lamentamos, mas parece que ocorreu algum erro no servidor
        </div>
      )}

      <Button className="mt-8 w-full">
        {!workspace ? 'Adicionar Workspace' : 'Editar Workspace'}
      </Button>
    </form>
  );
}
