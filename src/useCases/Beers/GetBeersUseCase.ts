import { GetBeersResponseDTO } from '~/dtos/beers';
import api from '~/services/api';

async function getBeersUseCase(): Promise<GetBeersResponseDTO> {
  const { data } = await api.get<GetBeersResponseDTO>('/beers');

  return data;
}

export default getBeersUseCase;
