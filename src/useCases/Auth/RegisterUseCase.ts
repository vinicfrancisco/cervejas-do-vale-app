import { UserDTO } from '~/dtos/user';
import api from '~/services/api';

interface RegisterUseCaseProps {
  name: string;
  email: string;
  password: string;
}

async function registerUseCase({
  email,
  name,
  password,
}: RegisterUseCaseProps): Promise<void> {
  await api.post<UserDTO>('/users', {
    name,
    email,
    password,
  });
}

export default registerUseCase;
