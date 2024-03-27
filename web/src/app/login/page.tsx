import Button from '@/components/Button';
import Center from '@/components/Center';
import { TextInput } from '@/components/TextInput';
import { Envelope, LockSimple } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';
import Link from 'next/link';

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
      <form
        action=""
        className="flex flex-col items-center max-w-md w-full gap-3 p-4"
      >
        <TextInput.Root>
          <TextInput.Wrapper>
            <TextInput.Icon>
              <Envelope />
            </TextInput.Icon>
            <TextInput.Input placeholder="Digite o seu email" />
          </TextInput.Wrapper>
        </TextInput.Root>

        <TextInput.Root>
          <TextInput.Wrapper>
            <TextInput.Icon>
              <LockSimple />
            </TextInput.Icon>
            <TextInput.Input type="password" placeholder="Digite sua senha" />
          </TextInput.Wrapper>
        </TextInput.Root>
        <div className="bg-red-300 py-3 px-4 w-full text-sm text-red-700 border-red-400 border-2 font-bold rounded">
          Usuário ou senha incorretos
        </div>

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
