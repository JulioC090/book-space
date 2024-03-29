/* eslint-disable no-unused-vars */
'use client';

import WorkspaceGateway from '@/infra/gateways/WorkspaceGateway';
import AxiosHttpClient from '@/infra/http/AxiosHttpClient';
import UrlReplaceParams from '@/infra/http/UrlReplaceParams';
import { Workspace } from '@/models/Workspace';
import { createContext, useEffect, useState } from 'react';

interface WorkspacesContextType {
  workspaces: Array<Workspace>;
  addWorkspace(workspace: Omit<Workspace, 'id'>): Promise<boolean>;
  updateWorkspace(
    workspaceId: string,
    workspace: Omit<Workspace, 'id'>,
  ): Promise<boolean>;
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

  useEffect(() => {
    async function fetchData() {
      setWorkspaces(await workspaceGateway.load());
    }

    fetchData();
  }, []);

  async function addWorkspace(
    workspace: Omit<Workspace, 'id'>,
  ): Promise<boolean> {
    if (!(await workspaceGateway.add(workspace))) return false;

    const workspaces = await workspaceGateway.load();
    setWorkspaces(workspaces);
    return true;
  }

  async function updateWorkspace(
    workspaceId: string,
    workspace: Omit<Workspace, 'id'>,
  ): Promise<boolean> {
    if (!(await workspaceGateway.update(workspaceId, workspace))) return false;

    const workspaces = await workspaceGateway.load();
    setWorkspaces(workspaces);
    return true;
  }

  return (
    <WorkspaceContext.Provider
      value={{ workspaces, addWorkspace, updateWorkspace }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
