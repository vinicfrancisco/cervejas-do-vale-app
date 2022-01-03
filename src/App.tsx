import React from 'react';
import { StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import theme from './assets/theme';
import AppNavigation from './navigation/AppNavigation';

const App: React.FC = () => {
  Icon.loadFont();

  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="dark-content" />

        <AppNavigation />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
