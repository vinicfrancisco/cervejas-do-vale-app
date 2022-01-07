export interface CodeDTO {
  id: string;
  code: string;
  alexa_id: null | string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  avatar: string;
  created_at: string;
  code: CodeDTO;
  updated_at: string;
  avatar_url: string;
}
