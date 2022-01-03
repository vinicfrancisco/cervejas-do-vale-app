import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  height: 60px;
  justify-content: center;
  margin-top: 8px;
  width: 100%;
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.darkGray};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: 18px;
`;
