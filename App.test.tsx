import React from 'react';
import {render} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureMockStore from 'redux-mock-store';
import {NavigationContainer} from '@react-navigation/native';
import App from './App';
import {persistor} from './app/core/store/store';

// Mock necessary parts of the app
jest.mock('redux-persist/integration/react', () => ({
  PersistGate: ({children}: {children: React.ReactNode}) => children,
}));

jest.mock('@react-navigation/native', () => ({
  NavigationContainer: ({children}: {children: React.ReactNode}) => children,
}));

// Create a mock store
const mockStore = configureMockStore();
const store = mockStore({});

describe('App', () => {
  it('renders correctly', () => {
    const {} = render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </PersistGate>
      </Provider>,
    );

    expect(true).toBe(true);
  });
});
