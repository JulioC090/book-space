import GridList from '@/components/atoms/GridList';
import withEmptyMessage, {
  withEmptyMessageProps,
} from '@/components/hoc/withEmptyMessage';
import WorkspaceListEmpty from '@/components/molecules/WorkspaceList/WorkspaceListEmpty';
import WorkspaceListItem from '@/components/molecules/WorkspaceList/WorkspaceListItem';
import { Workspace } from '@/models/Workspace';

interface WorkspaceListProps extends withEmptyMessageProps<Workspace> {}

function WorkspaceList({ data }: WorkspaceListProps) {
  return (
    <GridList>
      {data.map((workspace) => (
        <WorkspaceListItem key={workspace.id} workspace={workspace} />
      ))}
    </GridList>
  );
}

export default withEmptyMessage(WorkspaceList, WorkspaceListEmpty);
