import styled from 'styled-components/native';
import ReviewSVG from '~/assets/svg/Review.svg';
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
  padding: 24px 16px 28px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.large};
  margin-bottom: 16px;
`;

export const Description = styled.Text`
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSize.medium};
  text-align: center;
  margin: 0 16px;
`;

export const StarsContainer = styled.View`
  flex-direction: row;
  margin-top: 16px;
`;

export const StarButton = styled.TouchableOpacity``;

export const SuccessImage = styled(ReviewSVG).attrs(() => ({
  width: 300,
  height: 150,
}))`
  margin-bottom: 16px;
  margin-top: 16px;
`;
