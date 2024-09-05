import { configureStore } from '@reduxjs/toolkit';
import merchantReducer, { fetchMerchants } from './merchantSlice';
import api from '../../services/api';

const store = configureStore({ reducer: { merchant: merchantReducer } });

// Mocking api
jest.mock('../../services/api');

describe('merchantSlice', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should handle initial state', () => {
    const initialState = store.getState().merchant;
    expect(initialState).toEqual({
      merchants: [],
      loading: false,
      error: null,
    });
  });

  test('should handle fetchMerchants fulfilled', async () => {
    const mockMerchants = [
      { id: '1', name: 'Merchant 1' },
      { id: '2', name: 'Merchant 2' },
    ];
    (api.get as jest.Mock).mockResolvedValue({
      data: {
        success: true,
        data: {
          merchants: mockMerchants,
        },
      },
    });

    const result = await store.dispatch(fetchMerchants());
    const state = store.getState().merchant;

    expect(result.type).toBe('merchant/fetchMerchants/fulfilled');
    expect(state.merchants).toEqual(mockMerchants);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('should handle fetchMerchants rejected', async () => {
    const mockErrorMessage = 'Failed to fetch merchants';
    (api.get as jest.Mock).mockRejectedValue({
      response: {
        data: {
          message: mockErrorMessage,
        },
      },
    });

    const result = await store.dispatch(fetchMerchants());
    const state = store.getState().merchant;

    expect(result.type).toBe('merchant/fetchMerchants/rejected');
    expect(state.merchants).toEqual([]);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(mockErrorMessage);
  });

  test('should handle fetchMerchants pending', async () => {
    (api.get as jest.Mock).mockImplementation(() => new Promise(() => {}));

    const action = store.dispatch(fetchMerchants());
    const state = store.getState().merchant;

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();

    action.abort();
  });
});
