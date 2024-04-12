import { WorkspaceRoles } from '@/models/WorkspaceRoles';

interface RoleItem {
  value: WorkspaceRoles;
  label: string;
  level: number;
}

export const workspaceRolesList: Array<RoleItem> = [
  { value: WorkspaceRoles.DEFAULT, label: 'Padrão', level: 0 },
  { value: WorkspaceRoles.MANAGER, label: 'Gerente', level: 1 },
  { value: WorkspaceRoles.OWNER, label: 'Dono', level: 2 },
];
