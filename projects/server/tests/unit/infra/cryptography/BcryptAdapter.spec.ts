import BcryptAdapter from '@/infra/cryptography/BcryptAdapter';
import bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

const mockHash = bcrypt.hash as jest.Mock;
const mockCompare = bcrypt.compare as jest.Mock;

describe('BcryptAdapter', () => {
  test('It should return the hashed password', async () => {
    const salt = 10;
    const plaintext = 'password';
    mockHash.mockResolvedValueOnce('hashed_password');

    const bcryptAdapter = new BcryptAdapter(salt);
    const hashedPassword = await bcryptAdapter.hash(plaintext);

    expect(mockHash).toHaveBeenCalledWith(plaintext, salt);
    expect(hashedPassword).toBe('hashed_password');
  });

  test('It should return true if plaintext matches digest', async () => {
    const plaintext = 'password';
    const digest = 'hashed_password';

    mockCompare.mockResolvedValueOnce(true);

    const bcryptAdapter = new BcryptAdapter(10);
    const result = await bcryptAdapter.compare(plaintext, digest);

    expect(mockCompare).toHaveBeenCalledWith(plaintext, digest);
    expect(result).toBeTruthy();
  });

  it('should return false if plaintext does not match digest', async () => {
    const plaintext = 'wrong_password';
    const digest = 'hashed_password';

    mockCompare.mockResolvedValueOnce(false);

    const bcryptAdapter = new BcryptAdapter(10);
    const result = await bcryptAdapter.compare(plaintext, digest);

    expect(result).toBeFalsy();
  });
});
