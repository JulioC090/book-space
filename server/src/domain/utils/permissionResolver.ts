import { Permission } from 'domain/models/Permission';
import { rolePermissions } from 'domain/models/RolePermissions';
import { UserRole } from 'domain/models/UserRole';

export default function can(
  role: UserRole | 'OWNER',
  permission: Permission,
): boolean {
  const permissions = rolePermissions[role];
  return permissions.includes(permission);
}
