import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import theme from './assets/theme';
import AppProvider from './contexts';
import AppNavigation from './navigation/AppNavigation';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />

        <AppProvider>
          <AppNavigation />
        </AppProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
