import styled from 'styled-components/native';
import BeerSVG from '~/assets/svg/Beer.svg';

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))`
  flex: 1;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const BeerLogo = styled(BeerSVG)``;

export const Title = styled.Text`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
