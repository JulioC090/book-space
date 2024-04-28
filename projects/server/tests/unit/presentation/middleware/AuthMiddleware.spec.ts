import AuthMiddleware from '@/presentation/middleware/AuthMiddleware';

const mockLoadAccountByToken = {
  loadByToken: jest.fn(),
};

describe('AuthMiddleware', () => {
  test('It should return 401 if no authorization header is provided', async () => {
    const authMiddleware = new AuthMiddleware(mockLoadAccountByToken);

    const httpRequest = {
      headers: {},
    };

    const httpResponse = await authMiddleware.handle(httpRequest);

    expect(httpResponse.status).toBe(401);
  });

  test('It should return 401 if authorization header is invalid', async () => {
    const authMiddleware = new AuthMiddleware(mockLoadAccountByToken);

    const httpRequest = {
      headers: {
        authorization: 'Bearer ',
      },
    };

    const httpResponse = await authMiddleware.handle(httpRequest);

    expect(httpResponse.status).toBe(401);
  });

  test('It should return 401 if loadAccountByToken returns null', async () => {
    const authMiddleware = new AuthMiddleware(mockLoadAccountByToken);

    const httpRequest = {
      headers: {
        authorization: 'Bearer valid_token',
      },
    };

    mockLoadAccountByToken.loadByToken.mockResolvedValueOnce(null);

    const httpResponse = await authMiddleware.handle(httpRequest);

    expect(httpResponse.status).toBe(401);
  });

  test('It should return 200 with account info if authorization is valid', async () => {
    const authMiddleware = new AuthMiddleware(mockLoadAccountByToken);

    const httpRequest = {
      headers: {
        authorization: 'Bearer valid_token',
      },
    };

    mockLoadAccountByToken.loadByToken.mockResolvedValueOnce({
      id: 'user_id',
      name: 'user_name',
      email: 'user_email',
    });

    const httpResponse = await authMiddleware.handle(httpRequest);

    expect(httpResponse.status).toBe(200);
    expect(httpResponse.body).toEqual({
      accountId: 'user_id',
      account: expect.objectContaining({
        id: 'user_id',
      }),
    });
  });
});
