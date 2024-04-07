import UserListEmpty from '@/components/molecules/UserList/UserListEmpty';
import UserListItem from '@/components/molecules/UserList/UserListItem';
import { User } from '@/models/User';

interface UserListProps {
  users: Array<Omit<User, 'password'>>;
}

export default function UserList({ users }: UserListProps) {
  return (
    <div className="mt-2 w-full max-h-128 border-2 border-zinc-900 rounded overflow-y-auto">
      {users.length === 0 ? (
        <UserListEmpty />
      ) : (
        users.map((user) => (
          <UserListItem key={user.id} user={user}></UserListItem>
        ))
      )}
    </div>
  );
}
