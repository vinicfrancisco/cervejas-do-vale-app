import { UserDTO } from '~/dtos/user';
import api from '~/services/api';

async function updateProfileImageUseCase(source: string): Promise<UserDTO> {
  // eslint-disable-next-line no-undef
  const data = new FormData();

  data.append('avatar', {
    uri: source,
    type: 'image/jpg',
    name: 'avatar.jpg',
  });

  const response = await api.patch<UserDTO>('/users/avatar', data);

  return response.data;
}

export default updateProfileImageUseCase;
