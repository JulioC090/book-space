import JWTAdapter from '@/infra/cryptography/JWTAdapter';
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('encrypted_token'),
}));

describe('JWTAdapter', () => {
  test('It should return the encrypted token', async () => {
    const secret = 'my_secret_key';
    const plaintext = 'user_id';

    const jwtAdapter = new JWTAdapter(secret);
    const encryptedToken = await jwtAdapter.encrypt(plaintext);

    expect(jwt.sign).toHaveBeenCalledWith({ id: plaintext }, secret);
    expect(encryptedToken).toBe('encrypted_token');
  });
});
