'use client';

import Button from '@/components/atoms/Button';
import TextInputController from '@/components/molecules/TextInputController';
import { AuthContext } from '@/contexts/AuthContext';
import { makeAuthGateway } from '@/main/factories/gateways/AuthGatewayFactory';
import { emailRegex } from '@/utils/patterns';
import { Envelope, LockSimple, User } from '@phosphor-icons/react/dist/ssr';
import { useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface ISignUpFields {
  name: string;
  email: string;
  password: string;
}

const signupGateway = makeAuthGateway();

export default function SignUpForm() {
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
      setError('email', {
        type: 'email-exists',
        message: 'O email informado já está cadastrado',
      });
      return;
    }
    await signIn(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignUp)}
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
        placeholder="Digite o seu nome"
        icon={<User />}
        error={errors.name}
      />

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

      <TextInputController
        {...register('password', {
          required: { value: true, message: 'A senha é obrigatória' },
          minLength: {
            value: 8,
            message: 'A senha precisa ter pelo menos oito caracteres',
          },
        })}
        type="password"
        placeholder="Digite sua senha"
        icon={<LockSimple />}
        error={errors.password}
      />

      <Button className="mt-8 w-full">Cadastrar-se</Button>
    </form>
  );
}
