import Button from '@/components/atoms/Button';
import FormError from '@/components/atoms/FormError';
import TextInputController from '@/components/molecules/TextInputController';
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
      <TextInputController
        {...register('email', {
          required: { value: true, message: 'O email é obrigatório' },
          pattern: {
            value: emailRegex,
            message: 'O email precisa estar no formato "email@domain.com"',
          },
        })}
        placeholder="Digite o seu email"
        icon={<Envelope />}
        error={errors.email}
      />

      <FormError
        error={errors.email?.type}
        messages={{ server: 'O usuário informado não pode ser adicionado' }}
      />

      <Button className="mt-8 w-full">Adicionar usuário</Button>
    </form>
  );
}
