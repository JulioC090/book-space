import IAddUserInWorkspaceGateway from '@/infra/protocols/gateways/IAddUserInWorkspaceGateway';
import IDeleteUserInWorkspace from '@/infra/protocols/gateways/IDeleteUserInWorkspaceGateway';
import ILeaveWorkspaceGateway from '@/infra/protocols/gateways/ILeaveWorkspaceGateway';
import IUpdateWorkspaceUserRoleGateway from '@/infra/protocols/gateways/IUpdateWorkspaceUserRoleGateway';
import IWorkspaceUserService from '@/infra/protocols/services/IWorkspaceUserService';
import { User } from '@/models/User';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';

export default class WorkspaceUserService implements IWorkspaceUserService {
  private addWorkspaceUserGateway: IAddUserInWorkspaceGateway;
  private updateWorkspaceUserGateway: IUpdateWorkspaceUserRoleGateway;
  private deleteWorkspaceUserGateway: IDeleteUserInWorkspace;
  private leaveWorkspaceGateway: ILeaveWorkspaceGateway;

  constructor(
    addWorkspaceUserGateway: IAddUserInWorkspaceGateway,
    updateWorkspaceUserGateway: IUpdateWorkspaceUserRoleGateway,
    deleteWorkspaceUserGateway: IDeleteUserInWorkspace,
    leaveWorkspaceGateway: ILeaveWorkspaceGateway,
  ) {
    this.addWorkspaceUserGateway = addWorkspaceUserGateway;
    this.updateWorkspaceUserGateway = updateWorkspaceUserGateway;
    this.deleteWorkspaceUserGateway = deleteWorkspaceUserGateway;
    this.leaveWorkspaceGateway = leaveWorkspaceGateway;
  }

  async add(
    workspaceId: string,
    user: { email: string; role: WorkspaceRoles },
  ): Promise<(Omit<User, 'password'> & { role: WorkspaceRoles }) | undefined> {
    return this.addWorkspaceUserGateway.addUser(
      workspaceId,
      user.email,
      user.role,
    );
  }

  async update(
    workspaceId: string,
    user: { email: string; role: WorkspaceRoles },
  ): Promise<boolean> {
    return this.updateWorkspaceUserGateway.updateUserRole(
      workspaceId,
      user.email,
      user.role,
    );
  }

  async delete(workspaceId: string, userEmail: string): Promise<boolean> {
    return this.deleteWorkspaceUserGateway.deleteUser(workspaceId, userEmail);
  }

  async leave(workspaceId: string): Promise<boolean> {
    return await this.leaveWorkspaceGateway.leave(workspaceId);
  }
}
