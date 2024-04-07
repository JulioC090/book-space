'use client';

import Button from '@/components/atoms/Button';
import Center from '@/components/atoms/Center';
import { TextInput } from '@/components/atoms/TextInput';
import { AuthContext } from '@/contexts/AuthContext';
import { emailRegex } from '@/utils/patterns';
import { Envelope, LockSimple } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
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
          <TextInput.Error>
            {errors.email?.type === 'required' && 'O email é obrigatório'}
            {errors.email?.type === 'pattern' &&
              'O email precisa estar no formato "email@domain.com" '}
          </TextInput.Error>
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
          <TextInput.Error>
            {errors.password?.type === 'required' && 'A senha é obrigatória'}
          </TextInput.Error>
        </TextInput.Root>
        {errors.email?.type === 'server' && (
          <div className="bg-red-300 py-3 px-4 w-full text-sm text-red-700 border-red-400 border-2 font-bold rounded">
            Usuário ou senha incorretos
          </div>
        )}

        <Button className="mt-8 w-full">Entrar</Button>
      </form>
      <p className="text-sm mt-4">
        Você não possui uma conta?{' '}
        <Link
          href={'/signup'}
          className="text-green-haze-600 default-focus rounded hover:text-green-500 focus:text-green-500"
        >
          Cadastrar-se
        </Link>
      </p>
    </Center>
  );
}
