export default interface Space {
  id: string;
  workspaceId?: string;
  name: string;
  description: string;
  maxAmountOfPeople?: number | null;
}
