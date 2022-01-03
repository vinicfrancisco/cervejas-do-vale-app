import { TextInput as RNTextInput } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  align-items: center;
  background: ${({ theme }) => theme.colors.softBlack};
  border-radius: 10px;
  border-color: ${({ theme }) => theme.colors.softBlack};
  border-width: 2px;
  flex-direction: row;
  height: 60px;
  padding: 0 16px;
  width: 100%;

  ${({ theme, isErrored }) =>
    isErrored &&
    css`
      border-color: ${theme.colors.red};
    `}

  ${({ isFocused, theme }) =>
    isFocused &&
    css`
      border-color: ${theme.colors.primary};
    `}
`;

export const TextInput = styled(RNTextInput)`
  color: ${({ theme }) => theme.colors.white};
  flex: 1;
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

export const Icon = styled(FeatherIcon)``;

export const PasswordButton = styled.TouchableOpacity`
  padding: 8px;
  padding-right: 0;
`;
