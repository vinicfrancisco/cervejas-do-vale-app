import React from 'react';
import Button from '~/components/Button';
import useAuth from '~/hooks/useAuth';
import { Container, Title } from './styles';

const Home: React.FC = () => {
  const { logout } = useAuth();

  return (
    <Container>
      <Title>Home</Title>

      <Button onPress={logout}>Logout</Button>
    </Container>
  );
};

export default Home;
