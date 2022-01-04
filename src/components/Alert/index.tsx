import React from 'react';
import { AlertState } from '~/contexts/AlertContext';
import Button from '../Button';
import { Modal, Container, ErrorIcon, Title, Description } from './styles';

interface AlertProps {
  alert: AlertState;
  onDismiss: () => void;
  clearAlert: () => void;
}

const Alert: React.FC<AlertProps> = ({ alert, onDismiss, clearAlert }) => {
  const { show, title, description, buttonLabel, onConfirm } = alert;

  const handleHide = () => {
    if (alert.onModalHide) {
      alert.onModalHide();
    }

    clearAlert();
  };

  const handlePress = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      onDismiss();
    }
  };

  return (
    <Modal visible={show} onModalHide={handleHide} onDismiss={onDismiss}>
      <Container>
        <ErrorIcon />

        <Title>{title}</Title>

        <Description>{description}</Description>

        <Button onPress={handlePress}>{buttonLabel}</Button>
      </Container>
    </Modal>
  );
};

export default Alert;
