/* eslint-disable no-unused-vars */
'use client';

import { makeWorkspaceService } from '@/main/factories/services/WorkspaceServiceFactory';
import { makeWorkspaceUserService } from '@/main/factories/services/WorkspaceUserServiceFactory';
import { Workspace } from '@/models/Workspace';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import { createContext, useEffect, useState } from 'react';

interface WorkspacesContextType {
  workspaces: Array<Workspace>;
  addWorkspace(workspace: Omit<Workspace, 'id' | 'role'>): Promise<boolean>;
  updateWorkspace(
    workspaceId: string,
    workspace: Omit<Workspace, 'id' | 'role'>,
  ): Promise<boolean>;
  deleteWorkspace(workspaceId: string): Promise<boolean>;
  addUser(
    workspaceId: string,
    userEmail: string,
    role: WorkspaceRoles,
  ): Promise<boolean>;
  leaveWorkspace(workspaceId: string): Promise<boolean>;
  setIsValid: (isValid: boolean) => void;
}

interface WorkspacesProviderProps {
  children: React.ReactNode;
}

export const WorkspaceContext = createContext({} as WorkspacesContextType);

const workspaceUserService = makeWorkspaceUserService();
const workspaceService = makeWorkspaceService();

export function WorkspacesProvider({ children }: WorkspacesProviderProps) {
  const [workspaces, setWorkspaces] = useState<Array<Workspace>>([]);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setWorkspaces(await workspaceService.loadAll());
      setIsValid(true);
    }

    if (isValid) return;
    fetchData();
  }, [isValid]);

  async function addWorkspace(
    workspace: Omit<Workspace, 'id' | 'role'>,
  ): Promise<boolean> {
    const response = await workspaceService.add(workspace);
    if (!response) return false;

    setWorkspaces((prevWorkspaces) => [
      ...prevWorkspaces,
      { id: response, role: WorkspaceRoles.OWNER, ...workspace },
    ]);
    return true;
  }

  async function updateWorkspace(
    workspaceId: string,
    updatedWorkspace: Omit<Workspace, 'id'>,
  ): Promise<boolean> {
    if (!(await workspaceService.update(workspaceId, updatedWorkspace)))
      return false;

    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.map((workspace) => {
        if (workspace.id !== workspaceId) return workspace;
        return { id: workspaceId, ...updatedWorkspace };
      }),
    );
    return true;
  }

  async function deleteWorkspace(workspaceId: string): Promise<boolean> {
    if (!(await workspaceService.delete(workspaceId))) return false;

    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.filter((workspace) => workspace.id !== workspaceId),
    );
    return true;
  }

  async function addUser(
    workspaceId: string,
    userEmail: string,
    role: WorkspaceRoles,
  ): Promise<boolean> {
    return !!(await workspaceUserService.add(workspaceId, {
      email: userEmail,
      role,
    }));
  }

  async function leaveWorkspace(workspaceId: string) {
    if (!(await workspaceUserService.leave(workspaceId))) return false;
    setWorkspaces((prevWorkspaces) =>
      prevWorkspaces.filter((workspace) => workspace.id !== workspaceId),
    );
    return true;
  }

  return (
    <WorkspaceContext.Provider
      value={{
        workspaces,
        addWorkspace,
        updateWorkspace,
        deleteWorkspace,
        addUser,
        leaveWorkspace,
        setIsValid,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
