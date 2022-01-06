import React from 'react';
import { AlertProvider } from './AlertContext';
import { AuthProvider } from './AuthContext';
import { BeersProvider } from './BeersContext';

const AppProvider: React.FC = ({ children }) => {
  return (
    <AuthProvider>
      <AlertProvider>
        <BeersProvider>{children}</BeersProvider>
      </AlertProvider>
    </AuthProvider>
  );
};

export default AppProvider;
