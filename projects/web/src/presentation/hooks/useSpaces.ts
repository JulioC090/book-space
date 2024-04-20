import { makeSpaceService } from '@/main/factories/services/SpaceServiceFactory';
import Space from '@/models/Space';
import { spacesStore } from '@/presentation/stores/spacesStore';
import { useRecoilState } from 'recoil';

const spaceService = makeSpaceService();

export default function useSpaces() {
  const [spaces, setSpaces] = useRecoilState(spacesStore);

  function loadSpaces(spaces: Array<Space>) {
    setSpaces(spaces);
  }

  async function addSpace(
    workspaceId: string,
    space: Omit<Space, 'id'>,
  ): Promise<boolean> {
    const newSpace = await spaceService.add(workspaceId, space);
    if (!newSpace) return false;
    setSpaces((prevSpaces) => [...prevSpaces, newSpace]);
    return true;
  }

  async function deleteSpace(
    workspaceId: string,
    spaceId: string,
  ): Promise<boolean> {
    if (!(await spaceService.delete(workspaceId, spaceId))) return false;
    setSpaces((prevSpaces) =>
      prevSpaces.filter((space) => space.id !== spaceId),
    );
    return true;
  }

  return { spaces, loadSpaces, addSpace, deleteSpace };
}
