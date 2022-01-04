import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const ButtonContainer = styled(TouchableOpacity)`
  width: 100%;
`;

export const Background = styled.View<{ disabled?: boolean }>`
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  height: 60px;
  justify-content: center;
  margin-top: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  width: 100%;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.darkGray};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 18px;
`;
