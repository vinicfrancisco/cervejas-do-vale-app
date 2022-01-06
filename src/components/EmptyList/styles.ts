import styled from 'styled-components/native';
import NotFoundSVG from '~/assets/svg/NotFound.svg';

export const Container = styled.View`
  align-items: center;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 16px;
`;

export const NotFoundImage = styled(NotFoundSVG).attrs(() => ({
  height: 200,
  width: 400,
}))``;
