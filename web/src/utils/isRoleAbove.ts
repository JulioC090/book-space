import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import { getRole } from '@/utils/getRole';

export function isRoleAboveOrSame(
  role: WorkspaceRoles,
  roleComp: WorkspaceRoles,
) {
  return getRole(role)!.value <= getRole(roleComp)!.value;
}
