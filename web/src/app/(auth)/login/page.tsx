'use client';

import Button from '@/components/atoms/Button';
import Center from '@/components/atoms/Center';
import FormError from '@/components/atoms/FormError';
import LinkButton from '@/components/atoms/LinkButton';
import { TextInput } from '@/components/atoms/TextInput';
import { AuthContext } from '@/contexts/AuthContext';
import { emailRegex } from '@/utils/patterns';
import { Envelope, LockSimple } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ILoginFields {
  email: string;
  password: string;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<ILoginFields>();
  const { signIn } = useContext(AuthContext);

  const handleLogin: SubmitHandler<ILoginFields> = async (data) => {
    const response = await signIn(data);
    if (response === false) {
      const formError = { type: 'server' };
      setError('email', formError);
      setError('password', formError);
    }
  };

  const clearServerError = () => {
    if (errors.email?.type === 'server') {
      clearErrors('email');
      clearErrors('password');
    }
  };

  return (
    <Center>
      <Image
        width={256}
        height={256}
        src="/book-space-logo.png"
        alt="Book Space Logo"
      />
      <h1 className="text-2xl font-bold mb-12">Entrar no Book Space</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        onChange={clearServerError}
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
          <TextInput.Error
            error={errors.email?.type}
            messages={{
              required: 'O email é obrigatório',
              pattern: 'O email precisa estar no formato "email@domain.com"',
            }}
          />
        </TextInput.Root>

        <TextInput.Root>
          <TextInput.Wrapper error={!!errors.password}>
            <TextInput.Icon>
              <LockSimple />
            </TextInput.Icon>
            <TextInput.Input
              {...register('password', { required: true })}
              type="password"
              placeholder="Digite sua senha"
            />
          </TextInput.Wrapper>
          <TextInput.Error
            error={errors.password?.type}
            messages={{ required: 'A senha é obrigatória' }}
          />
        </TextInput.Root>

        <FormError
          error={errors.email?.type}
          messages={{ server: 'Usuário ou senha incorretos' }}
        />

        <Button className="mt-8 w-full">Entrar</Button>
      </form>
      <p className="text-sm mt-4">
        Você não possui uma conta?{' '}
        <LinkButton href={'/signup'}>Cadastrar-se</LinkButton>
      </p>
    </Center>
  );
}
