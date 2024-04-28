import { User } from '@/domain/models/User';
import IAddAccount from '@/domain/protocols/usecases/IAddAccount';
import { IHasher } from '@/infra/protocols/cryptography/IHasher';
import { IAddAccountRepository } from '@/infra/protocols/repositories/IAddAccountRepository';
import { ICheckAccountByEmailRepository } from '@/infra/protocols/repositories/ICheckAccountByEmailRepository';

export default class AddAccount implements IAddAccount {
  private hasher: IHasher;
  private addAccountRepository: IAddAccountRepository;
  private checkEmailRepository: ICheckAccountByEmailRepository;

  constructor(
    hasher: IHasher,
    addAccountRepository: IAddAccountRepository,
    checkEmailRepository: ICheckAccountByEmailRepository,
  ) {
    this.hasher = hasher;
    this.addAccountRepository = addAccountRepository;
    this.checkEmailRepository = checkEmailRepository;
  }

  async add(user: Omit<User, 'id'>): Promise<boolean> {
    const hasAccountWithSameEmail =
      await this.checkEmailRepository.checkByEmail(user.email);
    if (hasAccountWithSameEmail) return false;

    user.password = await this.hasher.hash(user.password);

    const result = this.addAccountRepository.add(user);
    return result;
  }
}
