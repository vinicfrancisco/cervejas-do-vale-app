import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BeerDTO } from '~/dtos/beers';
import formatMoney from '~/util/formatMoney';
import Rating from '../Rating';
import { Container, BeerImage, Title, Price } from './styles';

interface BeerProps {
  type?: 'Home' | 'Favorites';
  data: BeerDTO;
}

const Beer: React.VFC<BeerProps> = ({ data, type = 'Home' }) => {
  const { navigate } = useNavigation();

  const formattedPrice = useMemo(() => {
    return formatMoney(data.price, true);
  }, [data.price]);

  return (
    <Container
      onPress={() =>
        navigate('Main', {
          screen: type,
          params: {
            screen: 'BeerDetail',
            params: { beerId: data.id, beerName: data.name },
          },
        })
      }
    >
      <BeerImage source={{ uri: data.image_url }} />

      <Title>{data.name}</Title>

      <Rating rating={parseFloat(data.rating)} />

      <Price>{formattedPrice}</Price>
    </Container>
  );
};

export default Beer;
