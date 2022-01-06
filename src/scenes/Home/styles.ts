import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.black};
  flex: 1;
`;

export const Title = styled.Text``;

export const Separator = styled.View`
  background: ${({ theme }) => theme.colors.gray};
  height: ${StyleSheet.hairlineWidth}px;
  margin: 16px 0px;
`;
