export interface IUpdateAccessTokenRepository {
  updateAccessToken: (id: string, token: string | null) => Promise<void>;
}
