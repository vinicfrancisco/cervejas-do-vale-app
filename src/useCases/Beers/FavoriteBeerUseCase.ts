import { FavoriteBeerResponseDTO } from '~/dtos/beers';
import api from '~/services/api';

export interface FavoriteBeerUseCaseResponse {
  hasFavorited: boolean;
}

async function favoriteBeerUseCase(
  beerId: string,
): Promise<FavoriteBeerUseCaseResponse> {
  const { data } = await api.post<FavoriteBeerResponseDTO>(
    `/favorites/${beerId}`,
  );

  return {
    hasFavorited: !!data,
  };
}

export default favoriteBeerUseCase;
