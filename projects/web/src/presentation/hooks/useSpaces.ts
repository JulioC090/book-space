import { makeSpaceService } from '@/main/factories/services/SpaceServiceFactory';
import Space from '@/models/Space';
import { useState } from 'react';

const spaceService = makeSpaceService();

export default function useSpaces(defaultSpaces?: Array<Space>) {
  const [spaces, setSpaces] = useState<Array<Space>>(
    defaultSpaces ? defaultSpaces : [],
  );

  async function addSpace(
    workspaceId: string,
    space: Omit<Space, 'id'>,
  ): Promise<boolean> {
    const newSpace = await spaceService.add(workspaceId, space);
    if (!newSpace) return false;
    setSpaces((prevSpaces) => [...prevSpaces, newSpace]);
    return true;
  }

  return { spaces, setSpaces, addSpace };
}
