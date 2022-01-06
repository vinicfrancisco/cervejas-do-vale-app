import React, { useCallback, useLayoutEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { useQuery } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { useDebounce } from 'use-debounce';
import Beer from '~/components/Beer';
import { BeerDTO } from '~/dtos/beers';
import useBeersFilters from '~/hooks/useBeersFilters';
import getBeersUseCase, {
  GetBeersUseCaseProps,
} from '~/useCases/Beers/GetBeersUseCase';
import Header from './components/Header';
import { Container, Separator } from './styles';

const Home: React.FC = () => {
  const { setOptions } = useNavigation();
  const { filters } = useBeersFilters();

  const [value, setValue] = useState<string>('');
  const [debouncedValue] = useDebounce(value, 500);

  // TODO: LOADING
  // TODO: ERROR
  const { data, isLoading, isRefetching, isError, refetch } = useQuery(
    ['beers', { ...filters, search: debouncedValue }],
    async ({ queryKey }) => {
      const [, appliedFilters] = queryKey;

      const response = await getBeersUseCase({
        ...(appliedFilters as GetBeersUseCaseProps),
      });

      return response;
    },
  );

  const renderItem = useCallback(
    ({ item: beer }: ListRenderItemInfo<BeerDTO>) => <Beer data={beer} />,
    [],
  );

  useLayoutEffect(() => {
    setOptions({
      headerShown: true,
      header: () => <Header value={value} onChangeText={setValue} />,
    });
  }, [setOptions, value]);

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
