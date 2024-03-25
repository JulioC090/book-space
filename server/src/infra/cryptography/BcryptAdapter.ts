import bcrypt from 'bcrypt';
import { IHashComparer } from 'infra/protocols/cryptography/IHashComparer';
import { IHasher } from 'infra/protocols/cryptography/IHasher';

export default class BcryptAdapter implements IHasher, IHashComparer {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }

  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
}
