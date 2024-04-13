import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import { getRole } from '@/presentation/utils/getRole';

export function isRoleAboveOrSame(
  role: WorkspaceRoles,
  roleComp: WorkspaceRoles,
) {
  return getRole(role)!.value <= getRole(roleComp)!.value;
}
