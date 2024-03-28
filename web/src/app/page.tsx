'use client';

import Button from '@/components/Button';
import Center from '@/components/Center';
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';

export default function Home() {
  const { logout } = useContext(AuthContext);

  return (
    <Center>
      <Button onClick={logout}>Fazer logout</Button>
    </Center>
  );
}
