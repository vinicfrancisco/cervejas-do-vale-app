import { BeerBrandDTO } from '~/dtos/beers';
import api from '~/services/api';

async function getBeerBrandsUseCase(): Promise<BeerBrandDTO[]> {
  const { data } = await api.get<BeerBrandDTO[]>('/brands');

  return data;
}

export default getBeerBrandsUseCase;
