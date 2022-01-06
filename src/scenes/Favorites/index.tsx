import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, ListRenderItemInfo } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { useTheme } from 'styled-components';
import Beer from '~/components/Beer';
import EmptyList from '~/components/EmptyList';
import { BeerDTO } from '~/dtos/beers';
import getFavoriteBeersUseCase from '~/useCases/Beers/GetFavoriteBeersUseCase';
import { Container, Separator } from './styles';

const Favorites: React.FC = () => {
  const { colors } = useTheme();

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
    'favorites',
    async ({ pageParam }) => {
      const response = await getFavoriteBeersUseCase({
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

  const handleEndReached = () => {
    if (!isFetchingNextPage && hasNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback(
    ({ item: beer }: ListRenderItemInfo<BeerDTO>) => (
      <Beer type="Favorites" data={beer} />
    ),
    [],
  );

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

export default Favorites;
