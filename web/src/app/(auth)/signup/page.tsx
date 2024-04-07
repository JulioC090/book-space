import Center from '@/components/atoms/Center';
import LinkButton from '@/components/atoms/LinkButton';
import SignUpForm from '@/components/organism/SignUpForm';
import Image from 'next/image';

export default function SignUpPage() {
  return (
    <Center>
      <Image
        width={256}
        height={256}
        src="/book-space-logo.png"
        alt="Book Space Logo"
      />
      <h1 className="text-2xl font-bold mb-12">Cadastre-se no Book Space</h1>
      <SignUpForm />
      <p className="text-sm mt-4">
        Você já possui uma conta?{' '}
        <LinkButton href={'/login'}>Entrar</LinkButton>
      </p>
    </Center>
  );
}
