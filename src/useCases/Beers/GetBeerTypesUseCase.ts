import { BeerTypeDTO } from '~/dtos/beers';
import api from '~/services/api';

async function getBeerTypesUseCase(): Promise<BeerTypeDTO[]> {
  const { data } = await api.get<BeerTypeDTO[]>('/types');

  return data;
}

export default getBeerTypesUseCase;
