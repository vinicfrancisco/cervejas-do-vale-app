import { useContextSelector } from 'use-context-selector';
import { AuthContext, AuthContextData } from '~/contexts/AuthContext';

type UseAuthData = Pick<AuthContextData, 'login' | 'loadCurrentUserData'>;

export default function useAuth(): UseAuthData {
  const login = useContextSelector(AuthContext, state => state.login);
  const loadCurrentUserData = useContextSelector(
    AuthContext,
    state => state.loadCurrentUserData,
  );

  return {
    login,
    loadCurrentUserData,
  };
}
