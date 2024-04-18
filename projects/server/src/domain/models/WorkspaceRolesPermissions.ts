import Role from '@/domain/models/Role';
import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';

const DEFAULT = new Role<WorkspacePermissions>(
  [WorkspacePermissions.LEAVE_WORKSPACE],
  0,
);

const MANAGER = new Role<WorkspacePermissions>(
  [
    WorkspacePermissions.LEAVE_WORKSPACE,
    WorkspacePermissions.ADD_USER_TO_WORKSPACE,
    WorkspacePermissions.UPDATE_USER_ROLE,
    WorkspacePermissions.REMOVE_USER_FROM_WORKSPACE,
    WorkspacePermissions.ADD_SPACE_TO_WORKSPACE,
  ],
  1,
);

const OWNER = new Role<WorkspacePermissions>(
  [
    WorkspacePermissions.ADD_USER_TO_WORKSPACE,
    WorkspacePermissions.UPDATE_USER_ROLE,
    WorkspacePermissions.REMOVE_USER_FROM_WORKSPACE,
    WorkspacePermissions.UPDATE_WORKSPACE,
    WorkspacePermissions.DELETE_WORKSPACE,
    WorkspacePermissions.ADD_SPACE_TO_WORKSPACE,
  ],
  2,
);

export const workspaceRolesPermissions: Record<
  WorkspaceRoles,
  Role<WorkspacePermissions>
> = {
  DEFAULT,
  MANAGER,
  OWNER,
};
