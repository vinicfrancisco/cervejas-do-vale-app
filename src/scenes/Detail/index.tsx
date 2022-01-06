import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import EmptyList from '~/components/EmptyList';
import Rating from '~/components/Rating';
import RatingModal from '~/components/RatingModal';
import { HomeStackParamsList } from '~/@types/navigation';
import { BeerDTO } from '~/dtos/beers';
import favoriteBeerUseCase, {
  FavoriteBeerUseCaseResponse,
} from '~/useCases/Beers/FavoriteBeerUseCase';
import getBeerDetailUseCase from '~/useCases/Beers/GetBeerDetailUseCase';
import rateBeerUseCase from '~/useCases/Beers/RateBeerUseCase';
import formatMoney from '~/util/formatMoney';
import {
  Container,
  Title,
  FavoriteButton,
  Content,
  Image,
  Price,
  RatingButton,
  RatingContainer,
  RatingText,
  Separator,
  InfoRow,
  InfoLabel,
  InfoValue,
} from './styles';

type DetailRouteProp = RouteProp<HomeStackParamsList, 'BeerDetail'>;

const Detail: React.VFC = () => {
  const { setOptions } = useNavigation();
  const { params } = useRoute<DetailRouteProp>();
  const { colors } = useTheme();

  const [showRatingModal, setShowRatingModal] = useState<boolean>(false);

  const queryClient = useQueryClient();
  const beerDataKey = `beer-detail-${params.beerId}`;

  const { data, isLoading, isError } = useQuery(beerDataKey, () =>
    getBeerDetailUseCase(params.beerId),
  );
  const favoriteBeer = useMutation(
    async () => {
      const response = await favoriteBeerUseCase(params.beerId);

      return response;
    },
    {
      onSuccess: ({ hasFavorited }: FavoriteBeerUseCaseResponse) => {
        queryClient.invalidateQueries('beers');
        queryClient.invalidateQueries('favorites');
        queryClient.setQueryData(beerDataKey, {
          ...data,
          hasFavorited,
        });
      },
    },
  );

  const rateBeer = useMutation(
    async (rating: number) => {
      const response = await rateBeerUseCase({ beerId: params.beerId, rating });

      return response;
    },
    {
      onSuccess: (beer: BeerDTO) => {
        queryClient.invalidateQueries('beers');
        queryClient.invalidateQueries('favorites');
        queryClient.setQueryData(beerDataKey, {
          ...data,
          hasRated: beer.hasRated,
          rating: beer.rating,
        });
      },
    },
  );

  const formattedPrice = useMemo(() => {
    if (data) {
      return formatMoney(data.price, true);
    }

    return '';
  }, [data]);

  const formatGraduation = useMemo(() => {
    if (data) {
      return `${String(
        (parseFloat(data.alcoholic_degree) * 100).toFixed(1),
      ).replace('.', ',')}%`;
    }

    return '';
  }, [data]);

  const toggleFavorite = useCallback(async () => {
    await favoriteBeer.mutateAsync();
  }, [favoriteBeer]);

  useLayoutEffect(() => {
    setOptions({
      title: params.beerName,
      headerRight: () => (
        <FavoriteButton onPress={toggleFavorite}>
          <Icon
            name={data?.hasFavorited ? 'heart' : 'heart-outline'}
            size={24}
            color={colors.primary}
          />
        </FavoriteButton>
      ),
    });
  }, [
    colors.primary,
    data?.hasFavorited,
    params.beerName,
    setOptions,
    toggleFavorite,
  ]);

  return (
    <>
      <RatingModal
        beer_id={params.beerId}
        visible={showRatingModal}
        onRate={rateBeer.mutateAsync}
        onDismiss={() => setShowRatingModal(false)}
      />

      <Container>
        {isLoading && <ActivityIndicator size="large" color={colors.primary} />}

        {isError && (
          <EmptyList label="Houve um erro ao buscar a cerveja desejada" />
        )}

        {data && (
          <>
            <Image source={{ uri: data.image_url }} />

            <Content>
              <Title>{data.name}</Title>

              <RatingContainer>
                <Rating rating={parseFloat(data.rating)} />

                <RatingButton
                  disabled={!!data.hasRated}
                  onPress={() => setShowRatingModal(true)}
                >
                  <RatingText rated={!!data?.hasRated}>
                    {data?.hasRated ? 'Já avaliada' : 'Avaliar'}
                  </RatingText>
                </RatingButton>
              </RatingContainer>

              <Price>{formattedPrice}</Price>

              <Separator />

              <InfoRow>
                <InfoLabel>Marca:</InfoLabel>

                <InfoValue>{data.beer_brand.name}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Tipo:</InfoLabel>

                <InfoValue>{data.beer_type.name}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Volume:</InfoLabel>

                <InfoValue>{`${data.volume}ml`}</InfoValue>
              </InfoRow>

              <InfoRow>
                <InfoLabel>Graduação:</InfoLabel>

                <InfoValue>{formatGraduation}</InfoValue>
              </InfoRow>
            </Content>
          </>
        )}
      </Container>
    </>
  );
};

export default Detail;
