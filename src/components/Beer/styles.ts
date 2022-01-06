import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
`;

export const BeerImage = styled.Image`
  background: ${({ theme }) => theme.colors.darkGray};
  border-radius: 6px;
  height: 250px;
  resize-mode: contain;
  width: 100%;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${({ theme }) => theme.fontSize.large};
  margin-top: 16px;
`;

export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.green};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${({ theme }) => theme.fontSize.medium};
  margin-top: 8px;
`;
