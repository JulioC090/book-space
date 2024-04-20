import Space from '@/models/Space';
import GridList from '@/presentation/components/atoms/GridList';
import withEmptyMessage, {
  withEmptyMessageProps,
} from '@/presentation/components/hoc/withEmptyMessage';
import SpaceListEmpty from '@/presentation/components/molecules/SpaceList/SpaceListEmpty';
import SpaceListItem from '@/presentation/components/molecules/SpaceList/SpaceListItem';

interface SpaceListProps extends withEmptyMessageProps<Space> {}

function SpaceList({ data }: SpaceListProps) {
  return (
    <GridList className="w-full max-h-128">
      {data.map((space) => (
        <SpaceListItem key={space.id} space={space} />
      ))}
    </GridList>
  );
}

export default withEmptyMessage(SpaceList, SpaceListEmpty);
