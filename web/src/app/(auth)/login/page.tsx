'use client';

import Center from '@/components/atoms/Center';
import LinkButton from '@/components/atoms/LinkButton';
import LoginForm from '@/components/organism/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <Center>
      <Image
        width={256}
        height={256}
        src="/book-space-logo.png"
        alt="Book Space Logo"
      />
      <h1 className="text-2xl font-bold mb-12">Entrar no Book Space</h1>
      <LoginForm />
      <p className="text-sm mt-4">
        Você não possui uma conta?{' '}
        <LinkButton href={'/signup'}>Cadastrar-se</LinkButton>
      </p>
    </Center>
  );
}
