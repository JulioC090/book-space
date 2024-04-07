import Center from '@/components/atoms/Center';
import LinkButton from '@/components/atoms/LinkButton';
import Image from 'next/image';

interface AuthFormTemplateProps {
  title: string;
  children: React.ReactNode;
  link: { message: string; href: string; children: string };
}

export default function AuthFormTemplate({
  title,
  children,
  link,
}: AuthFormTemplateProps) {
  return (
    <Center>
      <Image
        width={256}
        height={256}
        src="/book-space-logo.png"
        alt="Book Space Logo"
      />
      <h1 className="text-2xl font-bold mb-12">{title}</h1>
      {children}
      <p className="text-sm mt-4">
        {link.message} <LinkButton href={link.href}>{link.children}</LinkButton>
      </p>
    </Center>
  );
}
