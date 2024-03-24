import { IEncrypter } from 'infra/protocols/cryptography/IEncrypter';
import jwt from 'jsonwebtoken';

export default class JWTAdapter implements IEncrypter {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  async encrypt(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret);
  }
}
