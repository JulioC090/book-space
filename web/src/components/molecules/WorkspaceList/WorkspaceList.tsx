import GridList from '@/components/atoms/GridList';
import withEmptyMessage, {
  withEmptyMessageProps,
} from '@/components/hoc/withEmptyMessage';
import WorkspaceListEmpty from '@/components/molecules/WorkspaceList/WorkspaceListEmpty';
import WorkspaceListItem from '@/components/molecules/WorkspaceList/WorkspaceListItem';
import { Workspace } from '@/models/Workspace';

interface WorkspaceListProps extends withEmptyMessageProps<Workspace> {}

function customSort(item: Workspace): string {
  const rolesOrder: { [key: string]: number } = {
    OWNER: 0,
    MANAGER: 1,
    DEFAULT: 2,
  };
  return rolesOrder[item.role] + item.name;
}

function WorkspaceList({ data }: WorkspaceListProps) {
  return (
    <GridList>
      {data
        .sort((a, b) => customSort(a).localeCompare(customSort(b)))
        .map((workspace) => (
          <WorkspaceListItem key={workspace.id} workspace={workspace} />
        ))}
    </GridList>
  );
}

export default withEmptyMessage(WorkspaceList, WorkspaceListEmpty);
