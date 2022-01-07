import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import ModalComponent from '../Modal';

export const Modal = styled(ModalComponent)`
  margin: 0;
`;

export const Container = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.colors.black};
  flex: 1;
  justify-content: center;
  padding: ${getStatusBarHeight()}px 32px 64px;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 8px;
  position: absolute;
  top: ${getStatusBarHeight() + 24}px;
  right: 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.green};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 32px;
  text-align: center;
`;

export const Tips = styled.Text`
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.mediumItalic};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 32px;
  text-align: center;
`;

export const Code = styled.Text`
  color: ${({ theme }) => theme.colors.alexa};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.extraLarge};
  margin-top: 32px;
  text-align: center;
`;
