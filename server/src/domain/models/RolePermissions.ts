import { UserRole } from 'domain/models/UserRole';
import { WorkspacePermissions } from 'domain/models/WorkspacePermissions';

export const rolePermissions: Record<
  UserRole | 'OWNER',
  Array<WorkspacePermissions>
> = {
  DEFAULT: [],
  MANAGER: [WorkspacePermissions.ADD_USER_TO_WORKSPACE],
  OWNER: [
    WorkspacePermissions.ADD_USER_TO_WORKSPACE,
    WorkspacePermissions.UPDATE_USER_ROLE,
    WorkspacePermissions.REMOVE_USER_FROM_WORKSPACE,
    WorkspacePermissions.EDIT_WORKSPACE,
    WorkspacePermissions.DELETE_WORKSPACE,
  ],
};
