import store, {RootState} from './store';
import {expect, test, beforeEach} from '@jest/globals';

// Mock `redux-persist` methods
jest.mock('redux-persist', () => ({
  persistReducer: jest.requireActual('redux-persist').persistReducer,
  persistStore: jest.fn(),
  persistor: jest.fn(),
}));

// Mock `AsyncStorage`
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('Redux Store Configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should configure store correctly', () => {
    const state: RootState = store.getState();

    expect(state.auth).toBeDefined();
    expect(state.merchants).toBeDefined();
  });
});
