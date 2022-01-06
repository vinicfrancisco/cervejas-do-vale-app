import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import ModalComponent from '~/components/Modal';

export const Modal = styled(ModalComponent)`
  margin: 0;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.softBlack};
  border-radius: 6px;
  padding: 16px;
  max-height: 50%;
  max-width: 80%;
  width: 100%;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

export const OptionButton = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 8px 0;
`;

export const OptionLabel = styled.Text`
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

export const Separator = styled.View`
  background: ${({ theme }) => theme.colors.gray};
  height: ${StyleSheet.hairlineWidth}px;
  width: 100%;
`;

export const CloseButton = styled.TouchableOpacity`
  padding: 8px;
  right: -8px;
`;
