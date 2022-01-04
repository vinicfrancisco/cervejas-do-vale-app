import { UserDTO } from '~/dtos/user';
import api from '~/services/api';

interface UpdateProfileUseCaseProps {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}

async function updateProfileUseCase({
  name,
  email,
  oldPassword,
  newPassword,
}: UpdateProfileUseCaseProps): Promise<UserDTO> {
  const { data } = await api.put<UserDTO>('/profile', {
    name,
    email,
    old_password: oldPassword,
    password: newPassword,
    password_confirmation: newPassword,
  });

  return data;
}

export default updateProfileUseCase;
