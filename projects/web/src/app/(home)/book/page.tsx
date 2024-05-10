'use client';

import Space from '@/models/Space';
import Container from '@/presentation/components/atoms/Container';
import BookSpaceList from '@/presentation/components/molecules/BookSpaceList';
import ListTemplate from '@/presentation/components/templates/ListTemplate';
import useSpaces from '@/presentation/hooks/useSpaces';
import { useEffect, useState } from 'react';

export default function SpaceListPage() {
  const { spaces, loadAllSpaces } = useSpaces();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      await loadAllSpaces();
      setIsLoading(false);
    }

    fetch(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return null;

  return (
    <Container>
      <div className="mb-6">
        <ListTemplate
          title={<h1 className="text-2xl font-bold pt-8">Espaços</h1>}
          list={<BookSpaceList data={spaces as Array<Required<Space>>} />}
        />
      </div>
    </Container>
  );
}
