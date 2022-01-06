import { BeersSort } from '~/contexts/BeersContext';
import { GetBeersResponseDTO } from '~/dtos/beers';
import api from '~/services/api';

export interface GetBeersUseCaseProps {
  page?: number;
  sort: BeersSort | null;
  search?: string;
  beerBrandId?: string;
  beerTypeId?: string;
}

async function getBeersUseCase(
  options: GetBeersUseCaseProps,
): Promise<GetBeersResponseDTO> {
  const { beerBrandId, beerTypeId, page, search, sort } = options;

  const { data } = await api.get<GetBeersResponseDTO>('/beers', {
    params: {
      page,
      sort,
      search,
      beer_brand_id: beerBrandId,
      beer_type_id: beerTypeId,
    },
  });

  return data;
}

export default getBeersUseCase;
