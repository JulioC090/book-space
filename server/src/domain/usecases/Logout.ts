import { IUpdateAccessTokenRepository } from 'infra/protocols/repositories/IUpdateAccessTokenRepository';

export default class Logout {
  private updateAccessTokenRepository: IUpdateAccessTokenRepository;

  constructor(updateAccessTokenRepository: IUpdateAccessTokenRepository) {
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }

  async logout(id: string) {
    await this.updateAccessTokenRepository.updateAccessToken(id, null);
  }
}
