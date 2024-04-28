import { makeWorkspaceResourceService } from '@/main/factories/services/WorkspaceResourceServiceFactory';
import { Resource } from '@/models/Resource';
import { workspaceResourcesStore } from '@/presentation/stores/workspaceResourcesStore';
import { useRecoilState } from 'recoil';

const workspaceResourceService = makeWorkspaceResourceService();

export default function useWorkspaceResource() {
  const [workspaceResources, setWorkspaceResources] = useRecoilState(
    workspaceResourcesStore,
  );

  function loadResources(props: {
    workspaceId: string;
    resources: Array<Resource>;
  }) {
    setWorkspaceResources(props);
  }

  async function addResource(name: string): Promise<Resource | null> {
    if (!workspaceResources.workspaceId) return null;
    const newResource = await workspaceResourceService.add(
      workspaceResources.workspaceId,
      name,
    );
    if (!newResource) return null;
    setWorkspaceResources((prevWorkspaceResources) => ({
      ...prevWorkspaceResources,
      resources: [...prevWorkspaceResources.resources, newResource],
    }));
    return newResource;
  }

  async function deleteResource(resourceId: string): Promise<boolean> {
    if (!workspaceResources.workspaceId) return false;
    const result = await workspaceResourceService.remove(
      workspaceResources.workspaceId,
      resourceId,
    );
    if (!result) return false;
    setWorkspaceResources((prevWorkspaceResources) => ({
      ...prevWorkspaceResources,
      resources: [
        ...prevWorkspaceResources.resources.filter(
          (resource) => resource.id !== resourceId,
        ),
      ],
    }));
    return true;
  }

  return { workspaceResources, loadResources, addResource, deleteResource };
}
