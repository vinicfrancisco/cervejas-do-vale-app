import { BeersSort } from '~/contexts/BeersContext';
import { GetBeersResponseDTO } from '~/dtos/beers';
import api from '~/services/api';

export interface GetFavoriteBeersUseCaseProps {
  page?: number;
}

async function getFavoriteBeersUseCase(
  options: GetFavoriteBeersUseCaseProps,
): Promise<GetBeersResponseDTO> {
  const { page } = options;

  const { data } = await api.get<GetBeersResponseDTO>('/favorites', {
    params: {
      page,
    },
  });

  return data;
}

export default getFavoriteBeersUseCase;
