import { useContextSelector } from 'use-context-selector';
import { AuthContext, AuthContextData } from '~/contexts/AuthContext';

type UseUser = Pick<
  AuthContextData,
  'user' | 'updateUserProfile' | 'updateProfileImage'
>;

export default function useUser(): UseUser {
  const user = useContextSelector(AuthContext, state => state.user);
  const updateUserProfile = useContextSelector(
    AuthContext,
    state => state.updateUserProfile,
  );
  const updateProfileImage = useContextSelector(
    AuthContext,
    state => state.updateProfileImage,
  );

  return {
    user,
    updateUserProfile,
    updateProfileImage,
  };
}
