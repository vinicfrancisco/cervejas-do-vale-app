import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '~/scenes/Auth/Login';
import Register from '~/scenes/Auth/Register';
import { AuthStackParamList } from '~/@types/navigation';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigation: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'fade',
      }}
    >
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigation;
