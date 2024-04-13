import { User } from '@/models/User';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import withEmptyMessage, {
  withEmptyMessageProps,
} from '@/presentation/components/hoc/withEmptyMessage';
import UserListEmpty from '@/presentation/components/molecules/UserList/UserListEmpty';
import UserListItem from '@/presentation/components/molecules/UserList/UserListItem';
import UserListRoot from '@/presentation/components/molecules/UserList/UserListRoot';

interface UserListProps
  extends withEmptyMessageProps<
    Omit<User, 'password'> & { role: WorkspaceRoles }
  > {}

function UserList({ data }: UserListProps) {
  return (
    <UserListRoot>
      {data.map((user) => (
        <UserListItem key={user.id} user={user}></UserListItem>
      ))}
    </UserListRoot>
  );
}

export default withEmptyMessage(UserList, UserListEmpty);
