import Button from '@/components/atoms/Button';
import { TextInput } from '@/components/atoms/TextInput';
import { Workspace } from '@/models/Workspace';
import { BookmarkSimple, Notebook } from '@phosphor-icons/react/dist/ssr';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IWorkspaceFields {
  name: string;
  tag: string;
}

export interface WorkspaceFormProps {
  workspace?: Omit<Workspace, 'role'>;
  onWorkspaceSubmit: (
    // eslint-disable-next-line no-unused-vars
    workspace: IWorkspaceFields & Partial<{ id: string }>,
  ) => Promise<boolean>;
  onSubmit?(): void;
}

export default function WorkspaceForm({
  workspace,
  onSubmit,
  onWorkspaceSubmit,
}: WorkspaceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IWorkspaceFields>();

  const handleWorkspaceSubmit: SubmitHandler<IWorkspaceFields> = async (
    data,
  ) => {
    const response = await onWorkspaceSubmit({ ...workspace, ...data });

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
        <TextInput.Error
          error={errors.name?.type}
          messages={{
            required: 'O nome é obrigatório',
            minLength: 'O nome precisa ter pelo menos dois caracteres',
          }}
        />
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
        <TextInput.Error
          error={errors.tag?.type}
          messages={{
            required: 'A tag é obrigatória',
            minLength: 'A tag precisa ter pelo menos dois caracteres',
          }}
        />
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
