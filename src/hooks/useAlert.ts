import { useContextSelector } from 'use-context-selector';
import { AlertContext, AlertContextData } from '~/contexts/AlertContext';

export default function useAlert(): AlertContextData {
  const showAlert = useContextSelector(AlertContext, state => state.showAlert);

  if (!showAlert) {
    throw new Error('useAlert must be used within an Alert Provider');
  }

  return {
    showAlert,
  };
}
