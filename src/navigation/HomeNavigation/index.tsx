import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { defaultHeaderProps } from '~/components/Header';
import BackButton from '~/components/Header/BackButton';
import Detail from '~/scenes/Detail';
import Home from '~/scenes/Home';
import { HomeStackParamsList } from '~/@types/navigation';

const HomeStack = createNativeStackNavigator<HomeStackParamsList>();

const HomeNavigation: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <HomeStack.Navigator
      screenOptions={{
        ...defaultHeaderProps,
        gestureEnabled: true,
        animation: 'slide_from_right',
      }}
    >
      <HomeStack.Screen
        name="BeersList"
        component={Home}
        options={{
          title: 'Cervejas do Vale',
        }}
      />

      <HomeStack.Screen
        name="BeerDetail"
        component={Detail}
        options={{
          title: 'Detalhe',
          headerLeft: () => (
            <BackButton
              onPress={() =>
                navigate('Main', {
                  screen: 'Home',
                  params: { screen: 'BeersList' },
                })
              }
            />
          ),
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeNavigation;
