'use client';

import Button from '@/components/Button';
import Center from '@/components/Center';
import { TextInput } from '@/components/TextInput';
import { emailRegex } from '@/utils/patterns';
import { Envelope, LockSimple } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ILoginFields {
  email: string;
  password: string;
  server: unknown;
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ILoginFields>();

  const handleLogin: SubmitHandler<ILoginFields> = async (data) => {
    console.log(data);
    setError('server', { type: 'user-password-incorrect' });
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
        {errors.server?.type === 'user-password-incorrect' && (
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
