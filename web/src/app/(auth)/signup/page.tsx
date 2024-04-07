'use client';

import Button from '@/components/atoms/Button';
import Center from '@/components/atoms/Center';
import LinkButton from '@/components/atoms/LinkButton';
import { TextInput } from '@/components/atoms/TextInput';
import { AuthContext } from '@/contexts/AuthContext';
import AuthGateway from '@/infra/gateways/AuthGateway';
import AxiosHttpClient from '@/infra/http/AxiosHttpClient';
import UrlReplaceParams from '@/infra/http/UrlReplaceParams';
import { emailRegex } from '@/utils/patterns';
import { Envelope, LockSimple, User } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ISignUpFields {
  name: string;
  email: string;
  password: string;
}

const urlReplaceParams = new UrlReplaceParams();
const httpClient = new AxiosHttpClient(
  process.env.NEXT_PUBLIC_API_URL || '',
  urlReplaceParams,
);
const signupGateway = new AuthGateway(httpClient);

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ISignUpFields>();
  const { signIn } = useContext(AuthContext);

  const handleSignUp: SubmitHandler<ISignUpFields> = async (data) => {
    const response = await signupGateway.signup(data);
    if (!response) {
      setError('email', { type: 'email-exists' });
      return;
    }
    await signIn(data);
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
          <TextInput.Error
            error={errors.name?.type}
            messages={{
              required: 'O nome é obrigatório',
              minLength: 'O nome precisa ter pelo menos dois caracteres',
            }}
          />
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
          <TextInput.Error
            error={errors.email?.type}
            messages={{
              required: 'O email é obrigatório',
              pattern: 'O email precisa estar no formato "email@domain.com"',
              'email-exists': 'O email informado já está cadastrado',
            }}
          />
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
          <TextInput.Error
            error={errors.password?.type}
            messages={{
              required: 'A senha é obrigatória',
              minLength: 'A senha precisa ter pelo menos oito caracteres',
            }}
          />
        </TextInput.Root>

        <Button className="mt-8 w-full">Cadastrar-se</Button>
      </form>
      <p className="text-sm mt-4">
        Você já possui uma conta?{' '}
        <LinkButton href={'/login'}>Entrar</LinkButton>
      </p>
    </Center>
  );
}
