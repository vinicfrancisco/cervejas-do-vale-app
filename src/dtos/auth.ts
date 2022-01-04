import { UserDTO } from './user';

export interface LoginResponseDTO {
  user: UserDTO;
  token: string;
}
