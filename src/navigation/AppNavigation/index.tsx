import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '~/scenes/Home';
import { AppStackParamList } from '~/@types/navigation';
import useAuth from '~/hooks/useAuth';
import useUser from '~/hooks/useUser';
import { USER_TOKEN } from '~/util/consts';
import AuthNavigation from '../AuthNavigation';

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigation: React.FC = () => {
  const { user } = useUser();
  const { loadCurrentUserData } = useAuth();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      const token = await AsyncStorage.getItem(USER_TOKEN);

      if (token) {
        await loadCurrentUserData();
      }

      setLoading(false);
      SplashScreen.hide();
    }

    loadUser();
  }, [loadCurrentUserData]);

  if (loading) {
    return null;
  }

  return (
    <AppStack.Navigator
      initialRouteName={user ? 'Home' : 'Auth'}
      screenOptions={{
        animation: 'slide_from_bottom',
      }}
    >
      <AppStack.Group
        screenOptions={{
          headerShown: false,
        }}
      >
        <AppStack.Screen name="Auth" component={AuthNavigation} />

        <AppStack.Screen name="Home" component={Home} />
      </AppStack.Group>
    </AppStack.Navigator>
  );
};

export default AppNavigation;
