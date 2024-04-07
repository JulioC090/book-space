import GridList from '@/components/atoms/GridList';
import WorkspaceListEmpty from '@/components/molecules/WorkspaceList/WorkspaceListEmpty';
import WorkspaceListItem from '@/components/molecules/WorkspaceList/WorkspaceListItem';
import { Workspace } from '@/models/Workspace';

interface WorkspaceListProps {
  workspaces: Array<Workspace>;
}

export default function WorkspaceList({ workspaces }: WorkspaceListProps) {
  if (workspaces.length === 0) return <WorkspaceListEmpty />;

  return (
    <GridList>
      {workspaces.map((workspace) => (
        <WorkspaceListItem key={workspace.id} workspace={workspace} />
      ))}
    </GridList>
  );
}
