import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'styled-components';
import useUser from '~/hooks/useUser';
import { Modal, Container, CloseButton, Code, Tips, Title } from './styles';

interface AlexaModalProps {
  authenticated: boolean;
  visible: boolean;
  onClose: () => void;
}

const AlexaModal: React.VFC<AlexaModalProps> = ({
  authenticated,
  visible,
  onClose,
}) => {
  const { user } = useUser();
  const { colors } = useTheme();

  return (
    <Modal visible={visible} onDismiss={onClose}>
      <Container>
        <CloseButton onPress={onClose}>
          <FeatherIcon name="x" size={32} color={colors.gray} />
        </CloseButton>

        <Icon name="amazon-alexa" color={colors.alexa} size={150} />

        {authenticated ? (
          <>
            <Title>Aqui estão algumas sugestões de busca</Title>

            <Tips>"Alexa, buscar cervejas da marca Handwerk"</Tips>

            <Tips>"Alexa, buscar cervejas do tipo Pilsen"</Tips>

            <Tips>"Alexa, mostre as melhores cervejas"</Tips>
          </>
        ) : (
          <>
            <Title>
              Para ativar a função da Alexa, siga os seguintes passos:
            </Title>

            <Tips>"Alexa, abra Cervejas do Vale"</Tips>

            <Tips>"Alexa, meu código é..."</Tips>

            <Code>{user?.code.code || ''}</Code>
          </>
        )}
      </Container>
    </Modal>
  );
};

export default AlexaModal;
