import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';
import Input from '~/components/Input';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.softBlack};
  padding: ${getStatusBarHeight() + 16}px 16px 12px;
`;

export const HeaderContent = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-bottom: 8px;
`;

export const SearchInput = styled(Input)`
  background: ${({ theme }) => theme.colors.black};
  height: 52px;
`;

export const FiltersButton = styled.TouchableOpacity`
  padding: 4px;
`;
