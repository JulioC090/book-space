import { UserRole } from '@/domain/models/UserRole';
import { WorkspacePermissions } from '@/domain/models/WorkspacePermissions';
import can from '@/domain/utils/permissionResolver';

describe('permissionResolver', () => {
  test('Should return true when the role has permission', () => {
    const result = can('OWNER', WorkspacePermissions.DELETE_WORKSPACE);
    expect(result).toBeTruthy();
  });

  test('Should return false when the role does not have permission', () => {
    const result = can(UserRole.MANAGER, WorkspacePermissions.DELETE_WORKSPACE);
    expect(result).toBeFalsy();
  });
});
