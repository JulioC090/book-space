import Button from '@/components/atoms/Button';
import FormError from '@/components/atoms/FormError';
import { SelectionField } from '@/components/atoms/SelectionField';
import TextInputController from '@/components/molecules/TextInputController';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import { emailRegex } from '@/utils/patterns';
import { Envelope } from '@phosphor-icons/react/dist/ssr';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface IWorkspaceAddUserFields {
  email: string;
  role: WorkspaceRoles;
}

interface WorkspaceAddUserFormProps {
  // eslint-disable-next-line no-unused-vars
  handleAddUser: (userEmail: string, role: WorkspaceRoles) => Promise<boolean>;
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
    control,
  } = useForm<IWorkspaceAddUserFields>();

  const handleWorkspaceAddUserSubmit: SubmitHandler<
    IWorkspaceAddUserFields
  > = async (data) => {
    const response = await handleAddUser(data.email, data.role);

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

      <Controller
        control={control}
        name="role"
        defaultValue={WorkspaceRoles.DEFAULT}
        render={({ field }) => {
          return (
            <SelectionField
              {...field}
              options={[
                { value: 'DEFAULT', label: 'Padrão' },
                { value: 'MANAGER', label: 'Gerente' },
              ]}
            />
          );
        }}
      />

      <FormError
        error={errors.email?.type}
        messages={{ server: 'O usuário informado não pode ser adicionado' }}
      />

      <Button className="mt-8 w-full">Adicionar usuário</Button>
    </form>
  );
}
