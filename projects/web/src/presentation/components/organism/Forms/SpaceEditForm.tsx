import Space from '@/models/Space';
import Button from '@/presentation/components/atoms/Button';
import FormError from '@/presentation/components/atoms/FormError';
import TextInputController from '@/presentation/components/molecules/TextInputController';
import { Notebook, UsersThree } from '@phosphor-icons/react';
import { BookOpen } from '@phosphor-icons/react/dist/ssr';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ISpaceFields {
  name: string;
  description: string;
  maxAmountOfPeople?: number;
}

interface SpaceEditFormProps {
  space: Space;
  onSpaceSubmit: (space: ISpaceFields) => Promise<boolean>;
  onSubmit?(): void;
}

export default function SpaceEditForm({
  space,
  onSpaceSubmit,
  onSubmit,
}: SpaceEditFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISpaceFields>();

  const handleWorkspaceSubmit: SubmitHandler<ISpaceFields> = async (data) => {
    const response = await onSpaceSubmit(data);

    if (!response) {
      const formError = { type: 'server' };
      setError('name', formError);
      setError('description', formError);
      setError('maxAmountOfPeople', formError);
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
        defaultValue={space.name}
        placeholder="Digite o nome do espaço"
        icon={<Notebook />}
        error={errors.name}
      />
      <TextInputController
        {...register('description', {
          required: { value: true, message: 'A descrição é obrigatória' },
          minLength: {
            value: 2,
            message: 'A descrição precisa ter pelo menos dois caracteres',
          },
        })}
        defaultValue={space.description}
        placeholder="Digite a descrição do espaço"
        icon={<BookOpen />}
        error={errors.description}
      />
      <TextInputController
        {...register('maxAmountOfPeople', {
          min: {
            value: 0,
            message: 'A quantidade máxima de pessoas precisa ser positivo',
          },
        })}
        defaultValue={space.maxAmountOfPeople || ''}
        placeholder="Quantidade máxima de pessoas"
        type="number"
        min={0}
        icon={<UsersThree />}
        error={errors.maxAmountOfPeople}
      />

      <FormError
        error={errors.name?.type}
        messages={{
          server: 'Lamentamos, mas parece que ocorreu algum erro no servidor',
        }}
      />

      <Button className="mt-8 w-full">Editar espaço</Button>
    </form>
  );
}
