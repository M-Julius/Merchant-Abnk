import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loginWithPhoneNumber, confirmOtp, logout } from './authSlice';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const store = configureStore({ reducer: { auth: authReducer } });

jest.mock('../../services/api');
jest.mock('@react-native-async-storage/async-storage');

describe('authSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should handle initial state', () => {
    const initialState = store.getState().auth;
    expect(initialState).toEqual({
      sessionId: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
  });

  test('should handle loginWithPhoneNumber thunk', async () => {
    const mockSessionId = 'test-session-id';
    (api.post as jest.Mock).mockResolvedValue({
      data: { success: true, data: { session_id: mockSessionId } },
    });

    const result = await store.dispatch(loginWithPhoneNumber({ countryDiallingCode: '+1', mobileNumber: '1234567890' }));
    const state = store.getState().auth;

    expect(result.type).toBe('auth/loginWithPhoneNumber/fulfilled');
    expect(state.sessionId).toBe(mockSessionId);
    expect(state.loading).toBe(false);
  });

  test('should handle confirmOtp thunk', async () => {
    const mockToken = 'test-token';
    (api.post as jest.Mock).mockResolvedValue({
      data: { success: true, data: { token: mockToken } },
    });

    const result = await store.dispatch(confirmOtp({ sessionId: 'test-session-id', otp: '123456' }));
    const state = store.getState().auth;

    expect(result.type).toBe('auth/confirmOtp/fulfilled');
    expect(state.token).toBe(mockToken);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe(false);
  });

  test('should handle logout reducer', () => {
    store.dispatch(logout());
    const state = store.getState().auth;

    expect(state.sessionId).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
