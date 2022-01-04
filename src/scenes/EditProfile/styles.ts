import styled from 'styled-components/native';
import InputForm from '~/components/Form/InputForm';

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
  padding: 0 32px 40px;
`;

export const ChangeProfileImageButton = styled.TouchableOpacity`
  padding: 8px;
  margin-bottom: 24px;
  margin-top: 8px;
`;

export const ChangeProfileImageText = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSize.small};
`;

export const ProfileInput = styled(InputForm)`
  margin-bottom: 8px;
`;
