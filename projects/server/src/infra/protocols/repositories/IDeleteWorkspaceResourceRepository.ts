export default interface IDeleteWorkspaceResourceRepository {
  delete(resourceId: string): Promise<boolean>;
}
