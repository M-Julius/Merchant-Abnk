import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './app/core/store/store';
import RootNavigation from './app/core/navigation/root-navigation';

function App() {
  return (
    <SafeAreaProvider>
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>
        </Provider>
      </PersistGate>
    </SafeAreaProvider>
  );
}

export default App;
