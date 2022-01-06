import React from 'react';
import { Container, Title, NotFoundImage } from './styles';

interface EmptyListProps {
  label: string;
}

const EmptyList: React.VFC<EmptyListProps> = ({ label }) => {
  return (
    <Container>
      <NotFoundImage />

      <Title>{label}</Title>
    </Container>
  );
};

export default EmptyList;
