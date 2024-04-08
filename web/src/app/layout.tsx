import { AuthProvider } from '@/contexts/AuthContext';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Book Space',
  description:
    'Um aplicativo de gestão de espaços projetado para simplificar a reserva de diferentes tipos de ambientes em instituições, tais como: salas de reunião, salas de conferências, salas de aula, laboratórios, auditórios, áreas de recreação, salas de estudo, salas de prova e salas de co-working.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
