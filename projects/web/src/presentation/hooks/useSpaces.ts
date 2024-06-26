import { makeSpaceService } from '@/main/factories/services/SpaceServiceFactory';
import Booking from '@/models/Booking';
import Space from '@/models/Space';
import { spacesStore } from '@/presentation/stores/spacesStore';
import { useRecoilState } from 'recoil';

const spaceService = makeSpaceService();

export default function useSpaces() {
  const [spaces, setSpaces] = useRecoilState(spacesStore);

  function loadSpaces(spaces: Array<Space>) {
    setSpaces(spaces);
  }

  async function loadAllSpaces() {
    const allSpaces = await spaceService.loadAll();
    setSpaces(allSpaces);
  }

  async function addSpace(
    workspaceId: string,
    space: Omit<Space, 'id'>,
    resources?: Array<string>,
  ): Promise<boolean> {
    const newSpace = await spaceService.add(workspaceId, space, resources);
    if (!newSpace) return false;
    setSpaces((prevSpaces) => [...prevSpaces, newSpace]);
    return true;
  }

  async function updateSpace(
    workspaceId: string,
    spaceId: string,
    partialSpace: Partial<Omit<Space, 'id'>>,
  ): Promise<boolean> {
    if (
      !(await spaceService.update(
        workspaceId,
        spaceId,
        partialSpace,
        partialSpace.resources?.map((v) => v.id),
      ))
    )
      return false;
    setSpaces((prevSpaces) =>
      prevSpaces.map((space) => {
        if (space.id !== spaceId) return space;
        return {
          ...space,
          ...partialSpace,
        };
      }),
    );
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

  async function bookSpace(
    spaceId: string,
    booking: Booking,
  ): Promise<boolean> {
    return !!(await spaceService.bookSpace(spaceId, booking));
  }

  return {
    spaces,
    loadSpaces,
    loadAllSpaces,
    addSpace,
    updateSpace,
    deleteSpace,
    bookSpace,
  };
}
