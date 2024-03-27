'use client';

import Button from '@/components/Button';
import Center from '@/components/Center';
import { TextInput } from '@/components/TextInput';
import { emailRegex } from '@/utils/patterns';
import { Envelope, LockSimple, User } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ISignUpFields {
  name: string;
  email: string;
  password: string;
}

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignUpFields>();

  const handleSignUp: SubmitHandler<ISignUpFields> = async (data) => {
    console.log(data);
    setError('email', { type: 'email-exists' });
  };

  return (
    <Center>
      <Image
        width={256}
        height={256}
        src="/book-space-logo.png"
        alt="Book Space Logo"
      />
      <h1 className="text-2xl font-bold mb-12">Cadastre-se no Book Space</h1>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="flex flex-col items-center max-w-md w-full gap-3 p-4"
      >
        <TextInput.Root>
          <TextInput.Wrapper error={!!errors.name}>
            <TextInput.Icon>
              <User />
            </TextInput.Icon>
            <TextInput.Input
              {...register('name', { required: true, minLength: 2 })}
              placeholder="Digite o seu nome"
            />
          </TextInput.Wrapper>
          <TextInput.Error>
            {errors.name?.type === 'required' && 'O nome é obrigatório'}
            {errors.name?.type === 'minLength' &&
              'O nome precisa ter pelo menos dois caracteres'}
          </TextInput.Error>
        </TextInput.Root>

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
            {errors.email?.type === 'email-exists' &&
              'O email informado já está cadastrado'}
          </TextInput.Error>
        </TextInput.Root>

        <TextInput.Root>
          <TextInput.Wrapper error={!!errors.password}>
            <TextInput.Icon>
              <LockSimple />
            </TextInput.Icon>
            <TextInput.Input
              {...register('password', { required: true, minLength: 8 })}
              type="password"
              placeholder="Digite sua senha"
            />
          </TextInput.Wrapper>
          <TextInput.Error>
            {errors.password?.type === 'required' && 'A senha é obrigatória'}
            {errors.password?.type === 'minLength' &&
              'A senha precisa ter pelo menos oito caracteres'}
          </TextInput.Error>
        </TextInput.Root>

        <Button className="mt-8 w-full">Cadastrar-se</Button>
      </form>
      <p className="text-sm mt-4">
        Você já possui uma conta?{' '}
        <Link
          href={'/login'}
          className="text-green-haze-600 default-focus rounded hover:text-green-500 focus:text-green-500"
        >
          Entrar
        </Link>
      </p>
    </Center>
  );
}
