import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { BackButtonContainer } from './styles';

interface BackButtonProps {
  onPress?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  const { goBack } = useNavigation();
  const { colors } = useTheme();

  return (
    <BackButtonContainer onPress={onPress || goBack}>
      <Icon name="chevron-left" size={32} color={colors.primary} />
    </BackButtonContainer>
  );
};

export default BackButton;
