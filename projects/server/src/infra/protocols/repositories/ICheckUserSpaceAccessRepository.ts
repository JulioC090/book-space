export default interface ICheckUserSpaceAccessRepository {
  verifyUserAccess(userId: string, spaceId: string): Promise<boolean>;
}
