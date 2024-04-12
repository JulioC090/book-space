import { workspaceRolesList } from '@/consts/workspaceRolesList';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';

function getRole(role: WorkspaceRoles) {
  return workspaceRolesList.find((item) => item.value === role);
}

export function isRoleAboveOrSame(
  role: WorkspaceRoles,
  roleComp: WorkspaceRoles,
) {
  return getRole(role)!.value <= getRole(roleComp)!.value;
}
