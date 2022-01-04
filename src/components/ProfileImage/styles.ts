import styled from 'styled-components/native';

export const Image = styled.Image`
  border-radius: 60px;
  height: 120px;
  margin-top: 32px;
  width: 120px;
`;

export const ImagePreview = styled.View`
  align-items: center;
  background: ${({ theme }) => theme.colors.softBlack};
  border-radius: 60px;
  height: 120px;
  justify-content: center;
  margin-top: 32px;
  width: 120px;
`;
