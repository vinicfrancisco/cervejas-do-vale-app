import styled from 'styled-components/native';
import InputForm from '~/components/Form/InputForm';
import BeerSVG from '~/assets/svg/Beer.svg';

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
  },
}))`
  background: ${({ theme }) => theme.colors.black};
  flex: 1;
`;

export const Content = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 0 32px 40px;
`;

export const BeerLogo = styled(BeerSVG)``;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.large};
  font-family: ${({ theme }) => theme.fonts.bold};
  margin-bottom: 32px;
`;

export const AuthInput = styled(InputForm)`
  margin-bottom: 16px;
`;

export const RegisterContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

export const RegisterButton = styled.TouchableOpacity``;

export const RegisterText = styled.Text<{ button?: boolean }>`
  color: ${({ theme, button }) =>
    button ? theme.colors.primary : theme.colors.white};
  font-family: ${({ theme, button }) =>
    button ? theme.fonts.medium : theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSize.small};
  padding: 8px 0;
`;
