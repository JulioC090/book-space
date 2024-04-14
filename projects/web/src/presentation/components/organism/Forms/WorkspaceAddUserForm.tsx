import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import Button from '@/presentation/components/atoms/Button';
import FormError from '@/presentation/components/atoms/FormError';
import { SelectionField } from '@/presentation/components/atoms/SelectionField';
import TextInputController from '@/presentation/components/molecules/TextInputController';
import getRolesWithLowerLevel from '@/presentation/utils/getRolesWithLowerLevel';
import { emailRegex } from '@/presentation/utils/patterns';
import { Envelope } from '@phosphor-icons/react/dist/ssr';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface IWorkspaceAddUserFields {
  email: string;
  role: WorkspaceRoles;
}

interface WorkspaceAddUserFormProps {
  handleAddUser: (userEmail: string, role: WorkspaceRoles) => Promise<boolean>;
  onSubmit?(): void;
  role: WorkspaceRoles;
}

export default function WorkspaceAddUserForm({
  handleAddUser,
  onSubmit,
  role,
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
            <SelectionField {...field} options={getRolesWithLowerLevel(role)} />
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
