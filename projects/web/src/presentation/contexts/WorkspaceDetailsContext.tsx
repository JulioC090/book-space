'use client';

import { makeWorkspaceService } from '@/main/factories/services/WorkspaceServiceFactory';
import { makeWorkspaceUserService } from '@/main/factories/services/WorkspaceUserServiceFactory';
import { Workspace } from '@/models/Workspace';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import { WorkspaceContext } from '@/presentation/contexts/WorkspacesContext';
import { useParams, useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

interface WorkspaceDetailsContextType {
  workspace?: Required<Workspace>;
  updateWorkspace: (
    workspaceId: string,
    partialWorkspace: Omit<Workspace, 'id' | 'role'>,
  ) => Promise<boolean>;
  addUser: (userEmail: string, role: WorkspaceRoles) => Promise<boolean>;
  updateUserRole: (userEmail: string, role: WorkspaceRoles) => Promise<boolean>;
  deleteUser: (userEmail: string) => Promise<boolean>;
}

interface WorkspaceDetailsProviderProps {
  children: React.ReactNode;
}

export const WorkspaceDetailsContext = createContext(
  {} as WorkspaceDetailsContextType,
);

const workspaceUserService = makeWorkspaceUserService();
const workspaceService = makeWorkspaceService();

export function WorkspaceDetailProvider({
  children,
}: WorkspaceDetailsProviderProps) {
  const [workspace, setWorkspace] = useState<Required<Workspace>>();
  const { setIsValid } = useContext(WorkspaceContext);
  const params = useParams<{ workspaceId: string }>();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await workspaceService.load(params.workspaceId);
      if (!response || response?.role === 'DEFAULT') router.push('/');
      setWorkspace(response);
    }

    fetchData();
  }, [params, router]);

  async function updateWorkspace(
    workspaceId: string,
    partialWorkspace: Omit<Workspace, 'id' | 'role'>,
  ): Promise<boolean> {
    if (!(await workspaceService.update(workspaceId, partialWorkspace)))
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
    const response = await workspaceUserService.add(workspace!.id, {
      email: userEmail,
      role,
    });
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
    const response = await workspaceUserService.update(workspace!.id, {
      email: userEmail,
      role,
    });

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
    const response = await workspaceUserService.delete(
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
