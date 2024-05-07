import GetSpacesController from '@/presentation/controllers/GetSpacesController';

const mockLoadSpaces = {
  load: jest.fn(),
};

describe('GetSpacesController', () => {
  let getSpacesController: GetSpacesController;

  beforeEach(() => {
    getSpacesController = new GetSpacesController(mockLoadSpaces);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should return spaces when successfully loaded', async () => {
    const mockSpaces = [
      { id: '1', name: 'Space 1', description: 'Description 1' },
      { id: '2', name: 'Space 2', description: 'Description 2' },
    ];
    mockLoadSpaces.load.mockResolvedValueOnce(mockSpaces);

    const request = { params: {}, account: { id: 'accountId' } };
    const result = await getSpacesController.handle(request);

    expect(result).toEqual({ status: 200, body: mockSpaces });
  });
});
