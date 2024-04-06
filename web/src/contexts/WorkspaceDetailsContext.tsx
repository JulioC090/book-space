'use client';

import WorkspaceGateway from '@/infra/gateways/WorkspaceGateway';
import AxiosHttpClient from '@/infra/http/AxiosHttpClient';
import UrlReplaceParams from '@/infra/http/UrlReplaceParams';
import { Workspace } from '@/models/Workspace';
import { useParams, useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

interface WorkspaceDetailsContextType {
  workspace?: Required<Workspace>;
  // eslint-disable-next-line no-unused-vars
  addUser: (userEmail: string) => Promise<boolean>;
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

  async function addUser(userEmail: string): Promise<boolean> {
    return await workspaceGateway.addUser(workspace!.id, userEmail);
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
      value={{ workspace, addUser, deleteUser }}
    >
      {children}
    </WorkspaceDetailsContext.Provider>
  );
}
