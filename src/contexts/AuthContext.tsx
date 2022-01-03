import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';

export interface AuthContextData {
  user: any;
  login: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<any>(null);

  const login = useCallback(async () => {
    //
  }, []);

  const AuthContextValue = useMemo((): AuthContextData => {
    return {
      user,
      login,
    };
  }, [login, user]);

  useEffect(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={AuthContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
