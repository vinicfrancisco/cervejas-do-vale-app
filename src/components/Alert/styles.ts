import styled from 'styled-components/native';
import ErrorSVG from '~/assets/svg/Error.svg';
import ModalComponent from '../Modal';

export const Modal = styled(ModalComponent)`
  margin: 0 32px;
  justify-content: center;
`;

export const Container = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.colors.softBlack};
  border-radius: 6px;
  justify-content: center;
  padding: 36px 16px 28px;
`;

export const ErrorIcon = styled(ErrorSVG).attrs(() => ({
  width: 270,
  height: 187,
}))``;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.red};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 32px;
  text-align: center;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSize.small};
  margin-bottom: 9px;
  margin-top: 6px;
  max-width: 250px;
  text-align: center;
`;
