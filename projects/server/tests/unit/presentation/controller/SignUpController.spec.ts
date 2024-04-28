import SignUpController from '@/presentation/controllers/SignUpController';

const mockAddAccount = {
  add: jest.fn(),
};

describe('SignUpController', () => {
  let signUpController: SignUpController;

  beforeEach(() => {
    signUpController = new SignUpController(mockAddAccount);
  });

  test('It should return 400 if request body is invalid', async () => {
    let request = {
      body: {},
    };
    let result = await signUpController.handle(request);
    expect(result.status).toBe(400);

    request = {
      body: {
        name: '',
        email: '',
        password: '',
      },
    };
    result = await signUpController.handle(request);
    expect(result.status).toBe(400);
  });

  test('It should return 400 if the email is already registered', async () => {
    const request = {
      body: {
        name: 'user_name',
        email: 'user_email@email.com',
        password: 'user_password',
      },
    };

    mockAddAccount.add.mockResolvedValueOnce(false);

    const result = await signUpController.handle(request);
    expect(result).toEqual({
      status: 400,
      body: 'Email is already registered',
    });
  });

  test('It should return 201 on success', async () => {
    const request = {
      body: {
        name: 'user_name',
        email: 'user_email@email.com',
        password: 'user_password',
      },
    };

    mockAddAccount.add.mockResolvedValueOnce(true);

    const result = await signUpController.handle(request);
    expect(result.status).toBe(201);
  });
});
