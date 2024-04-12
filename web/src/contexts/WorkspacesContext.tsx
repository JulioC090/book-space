/* eslint-disable no-unused-vars */
'use client';

import WorkspaceGateway from '@/infra/gateways/WorkspaceGateway';
import AxiosHttpClient from '@/infra/http/AxiosHttpClient';
import UrlReplaceParams from '@/infra/http/UrlReplaceParams';
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

const urlReplaceParams = new UrlReplaceParams();
const axiosHttpClient = new AxiosHttpClient(
  process.env.NEXT_PUBLIC_API_URL || '',
  urlReplaceParams,
);
const workspaceGateway = new WorkspaceGateway(axiosHttpClient);

export function WorkspacesProvider({ children }: WorkspacesProviderProps) {
  const [workspaces, setWorkspaces] = useState<Array<Workspace>>([]);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setWorkspaces(await workspaceGateway.load());
      setIsValid(true);
    }

    if (isValid) return;
    fetchData();
  }, [isValid]);

  async function addWorkspace(
    workspace: Omit<Workspace, 'id' | 'role'>,
  ): Promise<boolean> {
    const response = await workspaceGateway.add(workspace);
    if (!response) return false;

    setWorkspaces((prevWorkspaces) => [
      ...prevWorkspaces,
      { id: response.workspaceId, role: WorkspaceRoles.OWNER, ...workspace },
    ]);
    return true;
  }

  async function updateWorkspace(
    workspaceId: string,
    updatedWorkspace: Omit<Workspace, 'id'>,
  ): Promise<boolean> {
    if (!(await workspaceGateway.update(workspaceId, updatedWorkspace)))
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
    if (!(await workspaceGateway.delete(workspaceId))) return false;

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
    return !!(await workspaceGateway.addUser(workspaceId, userEmail, role));
  }

  async function leaveWorkspace(workspaceId: string) {
    if (!(await workspaceGateway.leave(workspaceId))) return false;
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
