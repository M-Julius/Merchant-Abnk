import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginResponse, OtpResponse} from '../../model/types';
import api from '../../services/api';

export interface AuthState {
  sessionId: string | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  sessionId: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Thunk to handle login via phone number
export const loginWithPhoneNumber = createAsyncThunk<
  string,
  {countryDiallingCode: string; mobileNumber: string},
  {rejectValue: string}
>(
  'auth/loginWithPhoneNumber',
  async ({countryDiallingCode, mobileNumber}, {rejectWithValue}) => {
    try {
      const response = await api.post<LoginResponse>('/v2/auth/otp/send/', {
        country_dialling_code: countryDiallingCode,
        mobile_number: mobileNumber,
      });
      if (response.data.success) {
        return response.data.data.session_id;
      } else {
        return rejectWithValue(response.data.message || 'Login failed');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error?.message || 'Login failed!');
    }
  },
);

// Thunk to handle OTP confirmation
export const confirmOtp = createAsyncThunk<
  string,
  {sessionId: string; otp: string},
  {rejectValue: string}
>('auth/confirmOtp', async ({sessionId, otp}, {rejectWithValue}) => {
  try {
    const response = await api.post<OtpResponse>('/v2/auth/otp/verify/', {
      otp,
      session_id: sessionId,
    });
    if (response.data.success) {
      const token = response.data.data.token;
      await AsyncStorage.setItem('token', token);
      return token;
    } else {
      return rejectWithValue(response.data.errors || 'OTP confirmation failed');
    }
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.error.message || 'OTP confirmation failed!',
    );
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.sessionId = null;
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('token');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginWithPhoneNumber.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithPhoneNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.sessionId = action.payload;
      })
      .addCase(loginWithPhoneNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(confirmOtp.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(confirmOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
