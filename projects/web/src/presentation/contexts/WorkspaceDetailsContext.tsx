'use client';

import { makeWorkspaceService } from '@/main/factories/services/WorkspaceServiceFactory';
import { makeWorkspaceUserService } from '@/main/factories/services/WorkspaceUserServiceFactory';
import { Workspace } from '@/models/Workspace';
import { WorkspaceRoles } from '@/models/WorkspaceRoles';
import { WorkspaceContext } from '@/presentation/contexts/WorkspacesContext';
import { useParams, useRouter } from 'next/navigation';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

interface WorkspaceDetailsContextType {
  workspace?: Required<Workspace>;
  updateWorkspace: (
    workspaceId: string,
    partialWorkspace: Omit<Workspace, 'id' | 'role'>,
  ) => Promise<boolean>;
  addUser: (userEmail: string, role: WorkspaceRoles) => Promise<boolean>;
  updateUserRole: (userEmail: string, role: WorkspaceRoles) => Promise<boolean>;
  deleteUser: (userEmail: string) => Promise<boolean>;
  invalidate(): void;
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
  const { setIsValid: setWorkspacesValid } = useContext(WorkspaceContext);
  const [isValid, setIsValid] = useState<boolean>(false);
  const params = useParams<{ workspaceId: string }>();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const response = await workspaceService.load(params.workspaceId);
      if (!response) router.push('/');
      setWorkspace(response);
      setIsValid(true);
    }

    if (isValid) return;
    fetchData();
  }, [params, router, isValid]);

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
    setWorkspacesValid(false);
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

  const invalidate = useCallback(() => {
    setIsValid(false);
  }, [setIsValid]);

  return (
    <WorkspaceDetailsContext.Provider
      value={{
        workspace,
        updateWorkspace,
        addUser,
        updateUserRole,
        deleteUser,
        invalidate,
      }}
    >
      {children}
    </WorkspaceDetailsContext.Provider>
  );
}
