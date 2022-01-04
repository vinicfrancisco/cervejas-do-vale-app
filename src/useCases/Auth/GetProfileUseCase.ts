import { UserDTO } from '~/dtos/user';
import api from '~/services/api';

async function getProfileUseCase(): Promise<UserDTO> {
  const { data } = await api.get<UserDTO>('/profile');

  return data;
}

export default getProfileUseCase;
