import Space from '@/models/Space';
import withEmptyMessage from '@/presentation/components/hoc/withEmptyMessage';
import BookSpaceListEmpty from '@/presentation/components/molecules/BookSpaceList/BookSpaceListEmpty';
import BookSpaceListItem from '@/presentation/components/molecules/BookSpaceList/BookSpaceListItem';

interface BookSpaceListProps {
  data: Array<Required<Space>>;
}

function BookSpaceList({ data }: BookSpaceListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {data.map((space) => (
        <BookSpaceListItem key={space.id} space={space} />
      ))}
    </ul>
  );
}

export default withEmptyMessage(BookSpaceList, BookSpaceListEmpty);
