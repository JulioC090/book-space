import Role from '@/domain/models/Role';
import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import { WorkspaceRoles } from '@/domain/models/WorkspaceRoles';

const DEFAULT = new Role<WorkspacePermissions>([], 0);

const MANAGER = new Role<WorkspacePermissions>(
  [
    WorkspacePermissions.ADD_USER_TO_WORKSPACE,
    WorkspacePermissions.UPDATE_USER_ROLE,
    WorkspacePermissions.REMOVE_USER_FROM_WORKSPACE,
  ],
  1,
);

const OWNER = new Role<WorkspacePermissions>(
  [
    WorkspacePermissions.ADD_USER_TO_WORKSPACE,
    WorkspacePermissions.UPDATE_USER_ROLE,
    WorkspacePermissions.REMOVE_USER_FROM_WORKSPACE,
    WorkspacePermissions.EDIT_WORKSPACE,
    WorkspacePermissions.DELETE_WORKSPACE,
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