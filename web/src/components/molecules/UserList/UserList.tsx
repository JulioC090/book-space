import withEmptyMessage, {
  withEmptyMessageProps,
} from '@/components/hoc/withEmptyMessage';
import UserListEmpty from '@/components/molecules/UserList/UserListEmpty';
import UserListItem from '@/components/molecules/UserList/UserListItem';
import UserListRoot from '@/components/molecules/UserList/UserListRoot';
import { User } from '@/models/User';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';

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
