import Space from '@/domain/models/Space';
import ILoadSpaces from '@/domain/protocols/usecases/ILoadSpaces';
import ILoadUserSpacesRepository from '@/infra/protocols/repositories/ILoadUserSpacesRepository';

export default class LoadSpaces implements ILoadSpaces {
  private loadUserSpacesRepository: ILoadUserSpacesRepository;

  constructor(loadUserSpacesRepository: ILoadUserSpacesRepository) {
    this.loadUserSpacesRepository = loadUserSpacesRepository;
  }

  async load(authenticatedUserId: string): Promise<Space[]> {
    return await this.loadUserSpacesRepository.loadUserSpaces(
      authenticatedUserId,
    );
  }
}
