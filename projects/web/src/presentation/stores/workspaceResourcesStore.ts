import { Resource } from '@/models/Resource';
import { atom } from 'recoil';

type WorkspaceResourcesStoreType = {
  workspaceId: string;
  resources: Array<Resource>;
};

export const workspaceResourcesStore = atom<WorkspaceResourcesStoreType>({
  key: 'workspaceResourcesStore',
  default: { workspaceId: '', resources: [] },
});
