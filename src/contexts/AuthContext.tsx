import React, { useCallback, useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';
import { UserDTO } from '~/dtos/user';
import getProfileUseCase from '~/useCases/Auth/GetProfileUseCase';
import loginUseCase from '~/useCases/Auth/LoginUseCase';

interface LoginProps {
  email: string;
  password: string;
}

export interface AuthContextData {
  user: UserDTO | null;
  login: (data: LoginProps) => Promise<void>;
  loadCurrentUserData: () => Promise<void>;
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

  const loadCurrentUserData = useCallback(async () => {
    const userData = await getProfileUseCase();

    setUser(userData);
  }, []);

  const AuthContextValue = useMemo((): AuthContextData => {
    return {
      user,
      login,
      loadCurrentUserData,
    };
  }, [loadCurrentUserData, login, user]);

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
