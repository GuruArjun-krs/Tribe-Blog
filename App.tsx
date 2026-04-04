import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import MainStacks from './src/Routes';
import { GlobalLoader } from '@/Components';

enableScreens();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <MainStacks />
          <GlobalLoader />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
