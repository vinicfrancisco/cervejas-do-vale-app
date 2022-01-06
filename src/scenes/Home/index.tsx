import React, { useCallback } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useQuery } from 'react-query';
import Beer from '~/components/Beer';
import { BeerDTO } from '~/dtos/beers';
import getBeersUseCase from '~/useCases/Beers/GetBeersUseCase';
import { Container, Separator } from './styles';

const Home: React.FC = () => {
  // TODO: LOADING
  // TODO: ERROR
  const { data, isLoading, isRefetching, isError, refetch } = useQuery(
    'beers',
    getBeersUseCase,
  );

  const renderItem = useCallback(
    ({ item: beer }: ListRenderItemInfo<BeerDTO>) => <Beer data={beer} />,
    [],
  );

  return (
    <Container>
      <FlatList
        data={data?.data || []}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        refreshing={isRefetching}
        onRefresh={refetch}
        contentContainerStyle={{
          flexGrow: 1,
          padding: 16,
        }}
        ItemSeparatorComponent={() => <Separator />}
      />
    </Container>
  );
};

export default Home;
