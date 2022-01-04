import { useContextSelector } from 'use-context-selector';
import { AuthContext, AuthContextData } from '~/contexts/AuthContext';

type UseAuthData = Pick<AuthContextData, 'login'>;

export default function useAuth(): UseAuthData {
  const login = useContextSelector(AuthContext, state => state.login);

  return {
    login,
  };
}