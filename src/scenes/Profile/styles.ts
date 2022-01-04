import { StyleSheet, Dimensions } from 'react-native';
import styled from 'styled-components/native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SEPARATOR_WIDTH = SCREEN_WIDTH - 32;

export const Container = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.colors.black};
  flex: 1;
`;

export const Username = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.large};
  margin-top: 16px;
`;

export const Email = styled.Text`
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 8px;
`;

export const LogoutButton = styled.TouchableOpacity`
  padding: 8px;
  margin-top: 8px;
`;

export const LogoutButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.red};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.medium};
`;

export const Separator = styled.View`
  align-self: center;
  background: ${({ theme }) => theme.colors.gray};
  height: ${StyleSheet.hairlineWidth}px;
  margin-top: 16px;
  width: ${SEPARATOR_WIDTH}PX;
`;

export const AlexaCodeLabel = styled.Text`
  color: ${({ theme }) => theme.colors.green};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 32px;
`;

export const AlexaCode = styled.Text`
  color: ${({ theme }) => theme.colors.green};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${({ theme }) => theme.fontSize.extraLarge};
  margin-top: 24px;
`;

export const EditProfileButton = styled.TouchableOpacity`
  padding: 4px;
  margin-right: -4px;
`;
