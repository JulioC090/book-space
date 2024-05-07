import ILoadSpaces from '@/domain/protocols/usecases/ILoadSpaces';
import LoadSpaces from '@/domain/usecases/LoadSpaces';

const mockLoadUserSpacesRepository = {
  loadUserSpaces: jest.fn(),
};

describe('LoadSpaces', () => {
  let loadSpaces: ILoadSpaces;

  beforeEach(() => {
    loadSpaces = new LoadSpaces(mockLoadUserSpacesRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It should load spaces successfully', async () => {
    const mockSpaces = [
      { id: '1', name: 'Space 1', description: 'Description 1' },
      { id: '2', name: 'Space 2', description: 'Description 2' },
    ];
    mockLoadUserSpacesRepository.loadUserSpaces.mockResolvedValueOnce(
      mockSpaces,
    );

    const result = await loadSpaces.load('userId');

    expect(result).toEqual(mockSpaces);
    expect(mockLoadUserSpacesRepository.loadUserSpaces).toHaveBeenCalledWith(
      'userId',
    );
  });
});
