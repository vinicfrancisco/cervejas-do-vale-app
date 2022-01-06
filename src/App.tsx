import React from 'react';
import { StatusBar } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import theme from './assets/theme';
import AppProvider from './contexts';
import AppNavigation from './navigation/AppNavigation';
import { navigationRef } from './navigation/RootNavigation';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />

        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <AppNavigation />
          </AppProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
