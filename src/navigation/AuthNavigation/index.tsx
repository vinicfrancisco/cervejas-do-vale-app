import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '~/scenes/Login';
import { AuthStackParamList } from '~/@types/navigation';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigation: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
