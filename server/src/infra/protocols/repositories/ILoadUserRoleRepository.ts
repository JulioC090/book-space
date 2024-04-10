import { UserRole } from 'domain/models/UserRole';

export default interface ILoadUserRoleRepository {
  loadUserRole(
    userId: string,
    workspaceId: string,
  ): Promise<UserRole | 'OWNER' | null>;
}
