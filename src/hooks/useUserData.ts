import { useContextSelector } from 'use-context-selector';
import { AuthContext, AuthContextData } from '~/contexts/AuthContext';

type UseUserData = Pick<AuthContextData, 'user'>;

export default function useUserData(): UseUserData {
  const user = useContextSelector(AuthContext, state => state.user);

  return {
    user,
  };
}
