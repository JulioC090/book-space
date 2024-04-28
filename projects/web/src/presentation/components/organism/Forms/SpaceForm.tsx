import Button from '@/presentation/components/atoms/Button';
import FormError from '@/presentation/components/atoms/FormError';
import { MultiSelectionField } from '@/presentation/components/atoms/MultiSelectionField';
import TextInputController from '@/presentation/components/molecules/TextInputController';
import useWorkspaceResource from '@/presentation/hooks/useWorkspaceResource';
import { Notebook, UsersThree } from '@phosphor-icons/react';
import { BookOpen, ListDashes } from '@phosphor-icons/react/dist/ssr';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface ISpaceFields {
  name: string;
  description: string;
  maxAmountOfPeople?: number;
  resources?: Array<string>;
}

interface SpaceFormProps {
  onSpaceSubmit: (space: ISpaceFields) => Promise<boolean>;
  onSubmit?(): void;
}

export default function SpaceForm({ onSpaceSubmit, onSubmit }: SpaceFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    control,
  } = useForm<ISpaceFields>();
  const { workspaceResources, addResource, deleteResource } =
    useWorkspaceResource();

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
        placeholder="Quantidade máxima de pessoas"
        type="number"
        min={0}
        icon={<UsersThree />}
        error={errors.maxAmountOfPeople}
      />

      <Controller
        control={control}
        name="resources"
        render={({ field }) => {
          return (
            <MultiSelectionField
              onChange={field.onChange}
              placeholder="Recursos"
              icon={<ListDashes />}
              data={workspaceResources.resources.map((resource) => ({
                value: resource.id,
                label: resource.name,
              }))}
              createItem={async (name) => {
                const item = await addResource(name);
                if (!item) return null;
                return { value: item.id, label: item.name };
              }}
              removeItem={(itemId) => deleteResource(itemId)}
            />
          );
        }}
      />

      <FormError
        error={errors.name?.type}
        messages={{
          server: 'Lamentamos, mas parece que ocorreu algum erro no servidor',
        }}
      />

      <Button className="mt-8 w-full">Adicionar espaço</Button>
    </form>
  );
}
