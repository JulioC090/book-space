import { workspaceRolesList } from '@/consts/workspaceRolesList';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';

export function getRole(role: WorkspaceRoles) {
  return workspaceRolesList.find((item) => item.value === role);
}
