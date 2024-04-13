import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import { workspaceRolesList } from '@/presentation/constants/workspaceRolesList';

export function getRole(role: WorkspaceRoles) {
  return workspaceRolesList.find((item) => item.value === role);
}
