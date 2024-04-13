import { IEncrypter } from 'infra/protocols/cryptography/IEncrypter';
import { IHashComparer } from 'infra/protocols/cryptography/IHashComparer';
import { ILoadAccountByEmailRepository } from 'infra/protocols/repositories/ILoadAccountByEmailRepository';
import { IUpdateAccessTokenRepository } from 'infra/protocols/repositories/IUpdateAccessTokenRepository';

export type AuthenticationInput = {
  email: string;
  password: string;
};

export type AuthenticationOutput = {
  token: string;
  name: string;
} | null;

export default class Authentication {
  private hashComparer: IHashComparer;
  private encrypter: IEncrypter;
  private loadAccountByEmailRepository: ILoadAccountByEmailRepository;
  private updateAccessTokenRepository: IUpdateAccessTokenRepository;

  constructor(
    hashComparer: IHashComparer,
    encrypter: IEncrypter,
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    updateAccessTokenRepository: IUpdateAccessTokenRepository,
  ) {
    this.hashComparer = hashComparer;
    this.encrypter = encrypter;
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }

  async auth(user: AuthenticationInput): Promise<AuthenticationOutput> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      user.email,
    );
    if (!account) return null;

    const isValid = await this.hashComparer.compare(
      user.password,
      account.password,
    );
    if (!isValid) return null;

    const token = await this.encrypter.encrypt(account.id);
    await this.updateAccessTokenRepository.updateAccessToken(account.id, token);

    return { token, name: account.name };
  }
}
