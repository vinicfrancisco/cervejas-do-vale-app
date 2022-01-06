import { BeerDTO } from '~/dtos/beers';
import api from '~/services/api';

interface RateBeerUseCaseProps {
  beerId: string;
  rating: number;
}

async function rateBeerUseCase({
  beerId,
  rating,
}: RateBeerUseCaseProps): Promise<BeerDTO> {
  const { data } = await api.post<BeerDTO>(`/rate/${beerId}`, {
    rating,
  });

  return data;
}

export default rateBeerUseCase;
