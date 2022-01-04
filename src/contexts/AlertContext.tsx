import React, { useCallback, useMemo, useState } from 'react';
import { createContext } from 'use-context-selector';
import Alert from '~/components/Alert';

export interface AlertState {
  show: boolean;
  title: string;
  description: string;
  buttonLabel: string;
  onConfirm?: () => void;
  onModalHide?: () => void;
}

export interface AlertContextData {
  showAlert: (data: AlertState, error?: unknown) => void;
}

export const AlertContext = createContext<AlertContextData>(
  {} as AlertContextData,
);

export const AlertProvider: React.FC = ({ children }) => {
  const [alert, setAlert] = useState<AlertState>({
    show: false,
    title: '',
    description: '',
    buttonLabel: '',
    onConfirm: () => null,
  });

  const showAlert = useCallback((data: AlertState) => {
    setAlert(data);
  }, []);

  const dismissAlert = useCallback(() => {
    setAlert(state => ({
      ...state,
      show: false,
    }));
  }, []);

  const clearAlert = useCallback(() => {
    setAlert({
      show: false,
      title: '',
      description: '',
      buttonLabel: '',
      onConfirm: () => null,
    });
  }, []);

  const AlertContextValue = useMemo((): AlertContextData => {
    return {
      showAlert,
    };
  }, [showAlert]);

  return (
    <AlertContext.Provider value={AlertContextValue}>
      <Alert alert={alert} onDismiss={dismissAlert} clearAlert={clearAlert} />

      {children}
    </AlertContext.Provider>
  );
};
