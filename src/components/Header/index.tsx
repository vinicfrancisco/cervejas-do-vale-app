import React from 'react';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import theme from '~/assets/theme';
import BackButton from './BackButton';

export const tabBarHeaderProps: BottomTabNavigationOptions = {
  headerStyle: {
    backgroundColor: theme.colors.softBlack,
  },
  headerTitleAlign: 'center',
  headerTintColor: theme.colors.primary,
  headerTitleStyle: {
    fontFamily: theme.fonts.medium,
    fontSize: Number(theme.fontSize.medium.replace('px', '')),
  },
};

export const defaultHeaderProps: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: theme.colors.softBlack,
  },
  headerTitleAlign: 'center',
  headerTintColor: theme.colors.primary,
  headerTitleStyle: {
    fontFamily: theme.fonts.medium,
    fontSize: Number(theme.fontSize.medium.replace('px', '')),
  },
  headerLeft: (): React.ReactNode => <BackButton />,
};
