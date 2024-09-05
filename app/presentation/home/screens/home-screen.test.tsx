import React from 'react';
import {render} from '@testing-library/react-native';
import {useDispatch, useSelector} from 'react-redux';
import HomeScreen from './home-screen';
import {fetchMerchants} from '../../../core/store/redux/merchantSlice';

// Mock the Redux hooks and actions
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../../core/store/redux/merchantSlice', () => ({
  fetchMerchants: jest.fn(),
}));

const mockDispatch = jest.fn();

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should render the HomeScreen correctly', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      merchants: [],
      loading: false,
      error: null,
    });

    const {getByTestId} = render(<HomeScreen />);
    expect(getByTestId('home-screen')).toBeTruthy();
  });

  it('should dispatch fetchMerchants on mount', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      merchants: [],
      loading: false,
      error: null,
    });

    render(<HomeScreen />);

    expect(mockDispatch).toHaveBeenCalledWith(fetchMerchants());
  });

  it('should display loading indicator when loading is true', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      merchants: [],
      loading: true,
      error: null,
    });

    const {getByTestId} = render(<HomeScreen />);
    expect(getByTestId('shimmer-profile')).toBeTruthy();
    expect(getByTestId('shimmer-input-form')).toBeTruthy();
    expect(getByTestId('shimmer-bell-icon')).toBeTruthy();
    expect(getByTestId('shimmer-card')).toBeTruthy();
  });

  it('should display merchants when they are loaded', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      merchants: [{id: '1', name: 'Merchant 1'}],
      loading: false,
      error: null,
    });

    const {getByText} = render(<HomeScreen />);
    expect(getByText('Merchant 1')).toBeTruthy();
  });

  it('should display error message when there is an error', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      merchants: [],
      loading: false,
      error: 'Network error',
    });

    const {getByText, getByTestId} = render(<HomeScreen />);
    expect(getByTestId('home-screen')).toBeTruthy();
    expect(getByText('Network error')).toBeTruthy();
  });
});
