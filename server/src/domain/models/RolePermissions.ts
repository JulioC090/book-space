import { Permission } from 'domain/models/Permission';
import { UserRole } from 'domain/models/UserRole';

export const rolePermissions: Record<UserRole | 'OWNER', Array<Permission>> = {
  DEFAULT: [],
  MANAGER: [Permission.ADD_USER_TO_WORKSPACE],
  OWNER: [
    Permission.ADD_USER_TO_WORKSPACE,
    Permission.UPDATE_USER_ROLE,
    Permission.REMOVE_USER_FROM_WORKSPACE,
    Permission.EDIT_WORKSPACE,
    Permission.DELETE_WORKSPACE,
  ],
};
