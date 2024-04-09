import { UserRole } from 'domain/models/UserRole';

export default interface IChangeUserRoleRepository {
  changeRole(
    workspaceId: string,
    { userId, role }: { userId: string; role: UserRole },
  ): Promise<boolean>;
}
