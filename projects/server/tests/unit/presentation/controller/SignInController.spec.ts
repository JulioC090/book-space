import SignInController from '@/presentation/controllers/SignInController';

const mockAuthentication = {
  auth: jest.fn(),
};

describe('SignInController', () => {
  let signInController: SignInController;

  beforeEach(() => {
    signInController = new SignInController(mockAuthentication);
  });

  test('It should return 400 if request body is invalid', async () => {
    let request = {
      body: {},
    };
    let result = await signInController.handle(request);
    expect(result.status).toBe(400);

    request = {
      body: {
        email: '',
        password: '',
      },
    };
    result = await signInController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 401 if Authentication returns null', async () => {
    const request = {
      body: {
        email: 'user_email@email.com',
        password: 'user_password',
      },
    };

    mockAuthentication.auth.mockResolvedValueOnce(null);

    const result = await signInController.handle(request);
    expect(result.status).toBe(401);
  });

  test('It should return 200 with token on success', async () => {
    const request = {
      body: {
        email: 'user_email@email.com',
        password: 'user_password',
      },
    };

    mockAuthentication.auth.mockResolvedValueOnce({
      token: 'token',
      name: 'user_name',
    });

    const result = await signInController.handle(request);
    expect(result).toEqual({
      status: 200,
      body: { token: 'token', name: 'user_name' },
    });
  });
});
