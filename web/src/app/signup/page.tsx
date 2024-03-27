import Button from '@/components/Button';
import Center from '@/components/Center';
import { TextInput } from '@/components/TextInput';
import { Envelope, LockSimple, User } from '@phosphor-icons/react/dist/ssr';
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
      <h1 className="text-2xl font-bold mb-12">Cadastre-se no Book Space</h1>
      <form
        action=""
        className="flex flex-col items-center max-w-md w-full gap-3 p-4"
      >
        <TextInput.Root>
          <TextInput.Wrapper>
            <TextInput.Icon>
              <User />
            </TextInput.Icon>
            <TextInput.Input placeholder="Digite o seu nome" />
          </TextInput.Wrapper>
        </TextInput.Root>

        <TextInput.Root>
          <TextInput.Wrapper error>
            <TextInput.Icon>
              <Envelope />
            </TextInput.Icon>
            <TextInput.Input placeholder="Digite o seu email" />
          </TextInput.Wrapper>
          <TextInput.Error>Email inválido</TextInput.Error>
        </TextInput.Root>

        <TextInput.Root>
          <TextInput.Wrapper>
            <TextInput.Icon>
              <LockSimple />
            </TextInput.Icon>
            <TextInput.Input type="password" placeholder="Digite sua senha" />
          </TextInput.Wrapper>
        </TextInput.Root>

        <Button className="mt-8 w-full">Cadastrar-se</Button>
      </form>
      <p className="text-sm mt-4">
        Já possuí uma conta?{' '}
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
