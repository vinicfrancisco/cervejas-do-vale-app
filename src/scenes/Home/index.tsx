import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useDebounce } from 'use-debounce';
import Beer from '~/components/Beer';
import EmptyList from '~/components/EmptyList';
import { HomeStackParamsList } from '~/@types/navigation';
import { BeerDTO } from '~/dtos/beers';
import useBeersFilters from '~/hooks/useBeersFilters';
import getBeersUseCase, {
  GetBeersUseCaseProps,
} from '~/useCases/Beers/GetBeersUseCase';
import Header from './components/Header';
import { Container, Separator } from './styles';

type HomeRouteProp = RouteProp<HomeStackParamsList, 'BeersList'>;

const Home: React.FC = () => {
  const { setOptions } = useNavigation();
  const { params } = useRoute<HomeRouteProp>();
  const { filters } = useBeersFilters();
  const { colors } = useTheme();

  const [value, setValue] = useState<string>('');
  const [debouncedValue] = useDebounce(value, 500);

  const {
    data,
    isLoading,
    isRefetching,
    isError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ['beers', { ...filters, search: debouncedValue }],
    async ({ queryKey, pageParam }) => {
      const [, appliedFilters] = queryKey;

      const response = await getBeersUseCase({
        ...(appliedFilters as GetBeersUseCaseProps),
        page: pageParam,
      });

      return response;
    },
    {
      getNextPageParam: (lastPage, pages) => {
        if (pages.length < lastPage.total) {
          return pages.length + 1;
        }

        return false;
      },
    },
  );

  const renderItem = useCallback(
    ({ item: beer }: ListRenderItemInfo<BeerDTO>) => <Beer data={beer} />,
    [],
  );

  const handleEndReached = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  useLayoutEffect(() => {
    setOptions({
      headerShown: true,
      header: () => <Header value={value} onChangeText={setValue} />,
    });
  }, [setOptions, value]);

  useEffect(() => {
    setValue(`${params?.brand || ''} ${params?.type || ''}`.trim());
  }, [params]);

  return (
    <Container>
      {isLoading && <ActivityIndicator size="large" color={colors.primary} />}

      {isError && <EmptyList label="Houve um erro ao buscar as cervejas" />}

      {!!data && (
        <FlatList
          data={data.pages.map(page => page.data)?.flat()}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          refreshing={isRefetching}
          onRefresh={refetch}
          ListEmptyComponent={() => (
            <EmptyList label="Nenhum cerveja foi encontrada" />
          )}
          ListFooterComponent={
            isFetchingNextPage
              ? () => <ActivityIndicator size="small" color={colors.primary} />
              : null
          }
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          contentContainerStyle={{
            flexGrow: 1,
            padding: 16,
            paddingTop: 0,
          }}
          ItemSeparatorComponent={() => <Separator />}
        />
      )}
    </Container>
  );
};

export default Home;
