import React, { useCallback } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import { tabBarHeaderProps } from '~/components/Header';
import { TabNavigationParamList } from '~/@types/navigation';
import FavoritesNavigation from '../FavoritesNavigation';
import HomeNavigation from '../HomeNavigation';
import ProfileNavigation from '../ProfileNavigation';
import { BottomTabBackground } from './styles';

interface IconsType {
  Home: string;
  Favorites: string;
  Profile: string;
}

const icons: IconsType = {
  Home: 'beer-outline',
  Favorites: 'heart-outline',
  Profile: 'person-outline',
};

const BottomTabNavigation = createBottomTabNavigator<TabNavigationParamList>();

const TabNavigation: React.FC = () => {
  const { colors } = useTheme();

  const renderTabBarIcon = useCallback(
    ({ color, size, route }) => (
      <Ionicons
        name={icons[route.name as keyof IconsType]}
        size={size}
        color={color}
      />
    ),
    [],
  );

  const renderTabBarBackground = useCallback(() => <BottomTabBackground />, []);

  return (
    <BottomTabNavigation.Navigator
      screenOptions={({ route }) => ({
        ...tabBarHeaderProps,
        headerShown: false,
        tabBarBackground: renderTabBarBackground,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarIcon: ({ color, size }) =>
          renderTabBarIcon({ color, size, route }),
      })}
    >
      <BottomTabNavigation.Screen
        name="Home"
        component={HomeNavigation}
        options={{
          tabBarLabel: 'Descobrir',
        }}
      />

      <BottomTabNavigation.Screen
        name="Favorites"
        component={FavoritesNavigation}
        options={{
          tabBarLabel: 'Favoritas',
        }}
      />

      <BottomTabNavigation.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarLabel: 'Perfil',
        }}
      />
    </BottomTabNavigation.Navigator>
  );
};

export default TabNavigation;
