import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defaultHeaderProps } from '~/components/Header';
import BackButton from '~/components/Header/BackButton';
import Detail from '~/scenes/Detail';
import Favorites from '~/scenes/Favorites';
import { FavoriteStackParamsList } from '~/@types/navigation';

const FavoritesStack = createNativeStackNavigator<FavoriteStackParamsList>();

const FavoritesNavigation: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <FavoritesStack.Navigator
      screenOptions={{
        gestureEnabled: true,
        animation: 'slide_from_right',
        ...defaultHeaderProps,
      }}
    >
      <FavoritesStack.Screen
        name="MyFavorites"
        component={Favorites}
        options={{
          title: 'Favoritas',
        }}
      />

      <FavoritesStack.Screen
        name="BeerDetail"
        component={Detail}
        options={{
          headerLeft: () => (
            <BackButton
              onPress={() =>
                navigate('Main', {
                  screen: 'Favorites',
                  params: { screen: 'MyFavorites' },
                })
              }
            />
          ),
        }}
      />
    </FavoritesStack.Navigator>
  );
};

export default FavoritesNavigation;
