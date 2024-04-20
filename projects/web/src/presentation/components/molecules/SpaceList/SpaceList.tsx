import Space from '@/models/Space';
import GridList from '@/presentation/components/atoms/GridList';
import withEmptyMessage from '@/presentation/components/hoc/withEmptyMessage';
import SpaceListEmpty from '@/presentation/components/molecules/SpaceList/SpaceListEmpty';
import SpaceListItem from '@/presentation/components/molecules/SpaceList/SpaceListItem';
import useSpaces from '@/presentation/hooks/useSpaces';

interface SpaceListProps {
  data: Array<Space>;
  workspaceId: string;
}

function SpaceList({ data, workspaceId }: SpaceListProps) {
  const { deleteSpace } = useSpaces();
  return (
    <GridList className="w-full max-h-128">
      {data.map((space) => (
        <SpaceListItem
          key={space.id}
          space={space}
          onDelete={(space) => deleteSpace(workspaceId, space)}
        />
      ))}
    </GridList>
  );
}

export default withEmptyMessage(SpaceList, SpaceListEmpty);
