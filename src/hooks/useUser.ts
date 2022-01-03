import { useContextSelector } from 'use-context-selector';
import { AuthContext, AuthContextData } from '~/contexts/AuthContext';

type UseUser = Pick<AuthContextData, 'user'>;

export default function useUser(): UseUser {
  const user = useContextSelector(AuthContext, state => state.user);

  return {
    user,
  };
}
