'use client';

import { WorkspaceContext } from '@/contexts/WorkspacesContext';
import WorkspaceGateway from '@/infra/gateways/WorkspaceGateway';
import AxiosHttpClient from '@/infra/http/AxiosHttpClient';
import UrlReplaceParams from '@/infra/http/UrlReplaceParams';
import { Workspace } from '@/models/Workspace';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import { useParams, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface WorkspaceDetailsContextType {
  workspace?: Required<Workspace>;
  updateWorkspace: (
    // eslint-disable-next-line no-unused-vars
    workspaceId: string,
    // eslint-disable-next-line no-unused-vars
    partialWorkspace: Omit<Workspace, 'id' | 'role'>,
  ) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  addUser: (userEmail: string, role: WorkspaceRoles) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  updateUserRole: (userEmail: string, role: WorkspaceRoles) => Promise<boolean>;
  // eslint-disable-next-line no-unused-vars
  deleteUser: (userEmail: string) => Promise<boolean>;
}

interface WorkspaceDetailsProviderProps {
  children: React.ReactNode;
}

export const WorkspaceDetailsContext = createContext(
  {} as WorkspaceDetailsContextType,
);

const urlReplaceParams = new UrlReplaceParams();
const axiosHttpClient = new AxiosHttpClient(
  process.env.NEXT_PUBLIC_API_URL || '',
  urlReplaceParams,
);
const workspaceGateway = new WorkspaceGateway(axiosHttpClient);

export function WorkspaceDetailProvider({
  children,
}: WorkspaceDetailsProviderProps) {
  const [workspace, setWorkspace] = useState<Required<Workspace>>();
  const { setIsValid } = useContext(WorkspaceContext);
  const params = useParams<{ workspaceId: string }>();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await workspaceGateway.loadWorkspaceDetails(
        params.workspaceId,
      );
      if (!response || response?.role !== 'OWNER') router.push('/');
      setWorkspace(response);
    }

    fetchData();
  }, [params, router]);

  async function updateWorkspace(
    workspaceId: string,
    partialWorkspace: Omit<Workspace, 'id' | 'role'>,
  ): Promise<boolean> {
    if (!(await workspaceGateway.update(workspaceId, partialWorkspace)))
      return false;

    setWorkspace((prevWorkspace) => ({
      ...prevWorkspace!,
      ...partialWorkspace,
    }));
    setIsValid(false);
    return true;
  }

  async function addUser(
    userEmail: string,
    role: WorkspaceRoles,
  ): Promise<boolean> {
    const response = await workspaceGateway.addUser(
      workspace!.id,
      userEmail,
      role,
    );
    if (!response) return false;

    setWorkspace((prevWorkspace) => ({
      ...prevWorkspace!,
      users: [...prevWorkspace!.users, response],
    }));

    return true;
  }

  async function updateUserRole(
    userEmail: string,
    role: WorkspaceRoles,
  ): Promise<boolean> {
    const response = await workspaceGateway.updateUserRole(
      workspace!.id,
      userEmail,
      role,
    );

    if (!response) return false;

    setWorkspace((prevWorkspace) => ({
      ...prevWorkspace!,
      users: prevWorkspace!.users.map((user) => {
        if (user.email !== userEmail) return user;
        return { ...user, role };
      }),
    }));

    return true;
  }

  async function deleteUser(userEmail: string): Promise<boolean> {
    const response = await workspaceGateway.deleteUser(
      workspace!.id,
      userEmail,
    );
    if (!response) return false;
    setWorkspace((prev) => ({
      ...prev!,
      users: prev!.users.filter((user) => user.email !== userEmail),
    }));

    return true;
  }

  return (
    <WorkspaceDetailsContext.Provider
      value={{
        workspace,
        updateWorkspace,
        addUser,
        updateUserRole,
        deleteUser,
      }}
    >
      {children}
    </WorkspaceDetailsContext.Provider>
  );
}
