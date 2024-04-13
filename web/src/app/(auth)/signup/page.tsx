import SignUpForm from '@/presentation/components/organism/SignUpForm';
import AuthFormTemplate from '@/presentation/components/templates/AuthFormTemplate';

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
