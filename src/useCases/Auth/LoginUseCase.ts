import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginResponseDTO } from '~/dtos/auth';
import { UserDTO } from '~/dtos/user';
import api from '~/services/api';
import { USER_TOKEN } from '~/util/consts';

interface LoginUseCaseProps {
  email: string;
  password: string;
}

async function loginUseCase({
  email,
  password,
}: LoginUseCaseProps): Promise<UserDTO> {
  const { data } = await api.post<LoginResponseDTO>('/signin', {
    email,
    password,
  });

  await AsyncStorage.setItem(USER_TOKEN, data.token);

  return data.user;
}

export default loginUseCase;
