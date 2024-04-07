import Button from '@/components/atoms/Button';
import FormError from '@/components/atoms/FormError';
import TextInputController from '@/components/molecules/TextInputController';
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
      <TextInputController
        {...register('name', {
          required: { value: true, message: 'O nome é obrigatório' },
          minLength: {
            value: 2,
            message: 'O nome precisa ter pelo menos dois caracteres',
          },
        })}
        defaultValue={workspace?.name}
        placeholder="Digite o nome da Workspace"
        icon={<Notebook />}
        error={errors.name}
      />

      <TextInputController
        {...register('tag', {
          required: { value: true, message: 'A tag é obrigatória' },
          minLength: {
            value: 2,
            message: 'A tag precisa ter pelo menos dois caracteres',
          },
        })}
        defaultValue={workspace?.tag}
        placeholder="Digite uma tag para a Workspace"
        icon={<BookmarkSimple />}
        error={errors.tag}
      />

      <FormError
        error={errors.name?.type}
        messages={{
          server: 'Lamentamos, mas parece que ocorreu algum erro no servidor',
        }}
      />

      <Button className="mt-8 w-full">
        {!workspace ? 'Adicionar Workspace' : 'Editar Workspace'}
      </Button>
    </form>
  );
}
