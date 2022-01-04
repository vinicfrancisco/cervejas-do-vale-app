import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { useTheme } from 'styled-components';
import { ButtonContainer, Background, ButtonText } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  loading?: boolean;
  children: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  loading,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <ButtonContainer {...rest}>
      <Background disabled={disabled || loading}>
        {loading ? (
          <ActivityIndicator size="small" color={colors.darkGray} />
        ) : (
          <ButtonText>{children}</ButtonText>
        )}
      </Background>
    </ButtonContainer>
  );
};

export default Button;
