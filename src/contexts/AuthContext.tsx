import React, { useCallback, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext } from 'use-context-selector';
import { UserDTO } from '~/dtos/user';
import { reset } from '~/navigation/RootNavigation';
import getProfileUseCase from '~/useCases/Auth/GetProfileUseCase';
import loginUseCase from '~/useCases/Auth/LoginUseCase';
import registerUseCase from '~/useCases/Auth/RegisterUseCase';
import updateProfileImageUseCase from '~/useCases/Profile/UpdateProfileImageUseCase';
import updateProfileUseCase from '~/useCases/Profile/UpdateProfileUseCase';
import { USER_TOKEN } from '~/util/consts';

interface LoginProps {
  email: string;
  password: string;
}

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

interface UpdateUserProfileProps {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface AuthContextData {
  user: UserDTO | null;
  login: (data: LoginProps) => Promise<void>;
  register: (data: RegisterProps) => Promise<void>;
  logout: () => Promise<void>;
  loadCurrentUserData: () => Promise<void>;
  updateUserProfile: (data: UpdateUserProfileProps) => Promise<void>;
  updateProfileImage: (source: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserDTO | null>(null);

  const login = useCallback(async ({ email, password }: LoginProps) => {
    const userData = await loginUseCase({ email, password });

    setUser(userData);
  }, []);

  const register = useCallback(
    async ({ name, email, password }: RegisterProps) => {
      await registerUseCase({
        name,
        email,
        password,
      });

      await login({ email, password });
    },
    [login],
  );

  const logout = useCallback(async () => {
    await AsyncStorage.multiRemove([USER_TOKEN]);

    setUser(null);

    reset('Auth');
  }, []);

  const loadCurrentUserData = useCallback(async () => {
    const userData = await getProfileUseCase();

    setUser(userData);
  }, []);

  const updateUserProfile = useCallback(
    async ({
      name,
      email,
      oldPassword,
      newPassword,
    }: UpdateUserProfileProps) => {
      const userData = await updateProfileUseCase({
        name,
        email,
        oldPassword,
        newPassword,
      });

      setUser(userData);
    },
    [],
  );

  const updateProfileImage = useCallback(async source => {
    const userData = await updateProfileImageUseCase(source);

    setUser(userData);
  }, []);

  const AuthContextValue = useMemo((): AuthContextData => {
    return {
      user,
      login,
      register,
      logout,
      loadCurrentUserData,
      updateUserProfile,
      updateProfileImage,
    };
  }, [
    loadCurrentUserData,
    login,
    logout,
    register,
    updateProfileImage,
    updateUserProfile,
    user,
  ]);

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
