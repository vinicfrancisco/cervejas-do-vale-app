import React from 'react';
import RNModal, { ModalProps } from 'react-native-modal';

interface ModalComponentProps
  extends Omit<
    Partial<ModalProps>,
    'isVisible' | 'onBackdropPress' | 'onBackdropPress'
  > {
  visible: boolean;
  onDismiss: () => void;
}

const Modal: React.FC<ModalComponentProps> = ({
  visible,
  onDismiss,
  children,
  ...props
}) => {
  return (
    <RNModal
      {...props}
      isVisible={visible}
      onBackdropPress={onDismiss}
      onBackButtonPress={onDismiss}
    >
      {children}
    </RNModal>
  );
};

export default Modal;
