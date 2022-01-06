import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
}))`
  background: ${({ theme }) => theme.colors.black};
  flex: 1;
`;

export const SectionHeader = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 16px;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

export const Separator = styled.View`
  background: ${({ theme }) => theme.colors.gray};
  height: ${StyleSheet.hairlineWidth}px;
  margin: 8px 0;
`;

export const CleanFiltersButton = styled.TouchableOpacity`
  padding: 8px;
  padding-right: 0;
  margin-bottom: -4px;
`;

export const CleanFiltersButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.red};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.small};
`;

export const ApplyFiltersButton = styled(Button)`
  margin-top: auto;
`;
