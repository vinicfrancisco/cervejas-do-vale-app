import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

export const FavoriteButton = styled.TouchableOpacity``;

export const Container = styled.ScrollView`
  background: ${({ theme }) => theme.colors.black};
  flex: 1;
`;

export const Image = styled.Image`
  background: ${({ theme }) => theme.colors.darkGray};
  height: ${RFValue(250)}px;
  resize-mode: contain;
  width: 100%;
`;

export const Content = styled.View`
  padding: 16px 16px 0;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.large};
`;

export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.green};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 8px;
`;

export const RatingContainer = styled.View`
  align-items: flex-end;
  flex-direction: row;
  justify-content: flex-start;
`;

export const RatingButton = styled.TouchableOpacity`
  padding: 8px 8px 0;
`;

export const RatingText = styled.Text<{ rated: boolean }>`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSize.medium};

  ${({ rated, theme }) =>
    rated &&
    css`
      color: ${theme.colors.gray};
      font-family: ${theme.fonts.regular};
      font-size: ${theme.fontSize.small};
    `}
`;

export const Separator = styled.View`
  background: ${({ theme }) => theme.colors.gray};
  height: ${StyleSheet.hairlineWidth}px;
  margin: 16px 32px;
`;

export const InfoRow = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
  width: 100%;
`;

export const InfoLabel = styled.Text`
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

export const InfoValue = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.medium};
`;
