import { UserRole } from 'domain/models/UserRole';

export default interface IAddUserToWorkspaceRepository {
  addUserToWorkspace(
    workspaceId: string,
    user: { id: string; role: UserRole },
  ): Promise<boolean>;
}
