import { rolePermissions } from 'domain/models/RolePermissions';
import { UserRole } from 'domain/models/UserRole';
import { WorkspacePermissions } from 'domain/models/WorkspacePermissions';

export default function can(
  role: UserRole | 'OWNER',
  permission: WorkspacePermissions,
): boolean {
  const permissions = rolePermissions[role];
  return permissions.includes(permission);
}
