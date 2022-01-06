import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
  padding: 4px 0;
`;

export const Label = styled.Text`
  color: ${({ theme }) => theme.colors.gray};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSize.medium};
`;
