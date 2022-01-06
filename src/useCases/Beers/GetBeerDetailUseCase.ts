import { BeerDTO } from '~/dtos/beers';
import api from '~/services/api';

async function getBeerDetailUseCase(id: string): Promise<BeerDTO> {
  const { data } = await api.get<BeerDTO>(`/beers/${id}`);

  return data;
}

export default getBeerDetailUseCase;
