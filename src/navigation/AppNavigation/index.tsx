import React from 'react';
// import SplashScreen from 'react-native-splash-screen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppStackParamList } from '~/@types/navigation';
import AuthNavigation from '../AuthNavigation';

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigation: React.FC = () => {
  return (
    <AppStack.Navigator
      initialRouteName="Auth"
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
      </AppStack.Group>
    </AppStack.Navigator>
  );
};

export default AppNavigation;
