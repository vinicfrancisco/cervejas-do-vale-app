import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.black};
  flex: 1;
  padding-top: 16px;
`;

export const Separator = styled.View`
  background: ${({ theme }) => theme.colors.gray};
  height: ${StyleSheet.hairlineWidth}px;
  margin: 16px 0px;
`;

export const AlexaButton = styled.TouchableOpacity`
  align-items: center;
  background: ${({ theme }) => theme.colors.softBlack};
  bottom: 16px;
  border-radius: 40px;
  height: ${RFValue(80)}px;
  justify-content: center;
  position: absolute;
  right: 16px;
  width: ${RFValue(80)}px;
`;
