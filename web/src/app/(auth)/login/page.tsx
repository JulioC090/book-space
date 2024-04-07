'use client';

import LoginForm from '@/components/organism/LoginForm';
import AuthFormTemplate from '@/components/templates/AuthFormTemplate';

export default function LoginPage() {
  return (
    <AuthFormTemplate
      title="Entrar no Book Space"
      link={{
        message: 'Você não possui uma conta? ',
        href: '/signup',
        children: 'Cadastrar-se',
      }}
    >
      <LoginForm />
    </AuthFormTemplate>
  );
}
