import LoadSpaces from '@/domain/usecases/LoadSpaces';
import SpacePrismaRepository from '@/infra/database/prisma/SpacePrismaRepository';
import GetSpacesController from '@/presentation/controllers/GetSpacesController';

export const makeGetSpacesController = () => {
  const spacesRepository = new SpacePrismaRepository();
  const loadSpaces = new LoadSpaces(spacesRepository);
  return new GetSpacesController(loadSpaces);
};
