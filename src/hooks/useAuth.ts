import { useContextSelector } from 'use-context-selector';
import { AuthContext, AuthContextData } from '~/contexts/AuthContext';

type UseAuthData = Pick<
  AuthContextData,
  'login' | 'loadCurrentUserData' | 'logout' | 'register'
>;

export default function useAuth(): UseAuthData {
  const login = useContextSelector(AuthContext, state => state.login);
  const register = useContextSelector(AuthContext, state => state.register);
  const logout = useContextSelector(AuthContext, state => state.logout);
  const loadCurrentUserData = useContextSelector(
    AuthContext,
    state => state.loadCurrentUserData,
  );

  return {
    login,
    register,
    loadCurrentUserData,
    logout,
  };
}
