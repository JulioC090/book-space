import SignUpForm from '@/components/organism/SignUpForm';
import AuthFormTemplate from '@/components/templates/AuthFormTemplate';

export default function SignUpPage() {
  return (
    <AuthFormTemplate
      title="Cadastre-se no Book Space"
      link={{
        message: 'Você já possui uma conta?',
        href: '/login',
        children: 'Entrar',
      }}
    >
      <SignUpForm />
    </AuthFormTemplate>
  );
}
