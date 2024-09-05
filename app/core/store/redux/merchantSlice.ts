import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Merchant, MerchantResponse} from '../../model/types';
import api from '../../services/api';

export interface MerchantState {
  merchants: Merchant[];
  loading: boolean;
  error: string | null;
}

export const initialState: MerchantState = {
  merchants: [],
  loading: false,
  error: null,
};

// Thunk to fetch merchants
export const fetchMerchants = createAsyncThunk<
  Merchant[],
  void,
  {rejectValue: string}
>('merchant/fetchMerchants', async (_, {rejectWithValue}) => {
  try {
    const response = await api.get<MerchantResponse>(
      '/v2/buyer/merchant/featured/?country=sg',
    );
    if (response.data.success) {
      return response.data.data.merchants;
    } else {
      return rejectWithValue(
        response.data.errors || 'Failed to fetch merchants',
      );
    }
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || 'Failed to fetch merchants',
    );
  }
});

const merchantSlice = createSlice({
  name: 'merchant',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMerchants.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMerchants.fulfilled, (state, action) => {
        state.loading = false;
        state.merchants = action.payload;
      })
      .addCase(fetchMerchants.rejected, (state, action) => {
        state.loading = false;
        state.merchants = [];
        state.error = action.payload as string;
      });
  },
});

export default merchantSlice.reducer;
