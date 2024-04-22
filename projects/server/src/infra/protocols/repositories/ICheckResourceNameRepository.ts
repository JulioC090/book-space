export default interface ICheckResourceNameRepository {
  checkName(workspaceId: string, name: string): Promise<boolean>;
}
