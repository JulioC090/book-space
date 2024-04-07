import Button from '@/components/atoms/Button';
import { TextInput } from '@/components/atoms/TextInput';
import { emailRegex } from '@/utils/patterns';
import { Envelope } from '@phosphor-icons/react/dist/ssr';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IWorkspaceAddUserFields {
  email: string;
}

interface WorkspaceAddUserFormProps {
  // eslint-disable-next-line no-unused-vars
  handleAddUser: (userEmail: string) => Promise<boolean>;
  onSubmit?(): void;
}

export default function WorkspaceAddUserForm({
  handleAddUser,
  onSubmit,
}: WorkspaceAddUserFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IWorkspaceAddUserFields>();

  const handleWorkspaceAddUserSubmit: SubmitHandler<
    IWorkspaceAddUserFields
  > = async (data) => {
    const response = await handleAddUser(data.email);

    if (!response) {
      const formError = { type: 'server' };
      setError('email', formError);
      return;
    }

    onSubmit && onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit(handleWorkspaceAddUserSubmit)}
      className="flex flex-col items-center max-w-md w-full gap-3 p-4"
    >
      <TextInput.Root>
        <TextInput.Wrapper error={!!errors.email}>
          <TextInput.Icon>
            <Envelope />
          </TextInput.Icon>
          <TextInput.Input
            {...register('email', {
              required: true,
              pattern: {
                value: emailRegex,
                message: 'Email inválido',
              },
            })}
            placeholder="Digite o seu email"
          />
        </TextInput.Wrapper>
        <TextInput.Error>
          {errors.email?.type === 'required' && 'O email é obrigatório'}
          {errors.email?.type === 'pattern' &&
            'O email precisa estar no formato "email@domain.com" '}
        </TextInput.Error>
      </TextInput.Root>

      {errors.email?.type === 'server' && (
        <div className="bg-red-300 py-3 px-4 w-full text-sm text-red-700 border-red-400 border-2 font-bold rounded">
          O usuário informado não pode ser adicionado
        </div>
      )}

      <Button className="mt-8 w-full">Adicionar usuário</Button>
    </form>
  );
}
