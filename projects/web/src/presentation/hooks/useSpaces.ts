import { makeSpaceService } from '@/main/factories/services/SpaceServiceFactory';
import Space from '@/models/Space';
import { useState } from 'react';

const spaceService = makeSpaceService();

export default function useSpaces() {
  const [spaces, setSpaces] = useState<Array<Space>>([]);

  async function addSpace(
    workspaceId: string,
    space: Omit<Space, 'id'>,
  ): Promise<boolean> {
    const newSpace = await spaceService.add(workspaceId, space);
    if (!newSpace) return false;
    setSpaces((prevSpaces) => [...prevSpaces, newSpace]);
    return true;
  }

  return { spaces, addSpace };
}
