import { workspaceRolesList } from '@/consts/workspaceRolesList';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';

export default function getRolesWithLowerLevel(role: WorkspaceRoles) {
  const currentRoleIndex = workspaceRolesList.findIndex(
    (item) => item.value === role,
  );

  const rolesWithLowerLevel = [];
  for (let i = 0; i < currentRoleIndex; i++) {
    rolesWithLowerLevel.push(workspaceRolesList[i]);
  }

  return rolesWithLowerLevel;
}
