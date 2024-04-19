export default interface IDeleteSpaceRepository {
  delete(spaceId: string): Promise<boolean>;
}
