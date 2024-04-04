/* eslint-disable no-unused-vars */
'use client';

import { AuthContext } from '@/contexts/AuthContext';
import WorkspaceGateway from '@/infra/gateways/WorkspaceGateway';
import AxiosHttpClient from '@/infra/http/AxiosHttpClient';
import UrlReplaceParams from '@/infra/http/UrlReplaceParams';
import { Workspace } from '@/models/Workspace';
import { createContext, useContext, useEffect, useState } from 'react';

interface WorkspacesContextType {
  workspaces: Array<Workspace>;
  addWorkspace(workspace: Omit<Workspace, 'id'>): Promise<boolean>;
  updateWorkspace(
    workspaceId: string,
    workspace: Omit<Workspace, 'id'>,
  ): Promise<boolean>;
  deleteWorkspace(workspaceId: string): Promise<boolean>;
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
  const { userInfo } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      setWorkspaces(await workspaceGateway.load());
    }

    if (!userInfo) return;
    fetchData();
  }, [userInfo]);

  async function addWorkspace(
    workspace: Omit<Workspace, 'id'>,
  ): Promise<boolean> {
    const response = await workspaceGateway.add(workspace);
    if (!response) return false;

    setWorkspaces((prevWorkspaces) => [
      ...prevWorkspaces,
      { id: response.workspaceId, ...workspace },
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

  return (
    <WorkspaceContext.Provider
      value={{ workspaces, addWorkspace, updateWorkspace, deleteWorkspace }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
